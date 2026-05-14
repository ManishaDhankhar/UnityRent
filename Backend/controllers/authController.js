require('dotenv').config();
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const userModel = require("../model/user");
const transporter = require("../config/nodemailer");

module.exports.register = async(req, res)=>{
    const {name, email, password} = req.body;

    if(!name || !email || !password){
        return res.json({success: false, message: "Missing details"})
    }

    try{
        const existingUser = await userModel.findOne({email});
        if(existingUser){
            return res.json({success: false, message: "User already exists."});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new userModel({name, email, password: hashedPassword});
        await user.save();

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        // sending welcome email
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Welcome to UnityRent",
            text: `Welcome to UnityRent. Your account has been created with email id: ${email}`
        }

        await transporter.sendMail(mailOptions);

        return res.json({success: true});

    }catch(error){
        res.json({success: false, message: error.message})
    }
}

module.exports.login = async(req, res)=>{
    const{email, password} = req.body;

    if(!email || !password){
        return res.json({success: false, message: 'Email and password are requires'});
    }

    try{
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success: false, message: "Invalid email"})
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.json({success: false, message: "Invalid password"})
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.json({success: true});


    }catch(error){
        return res.json({success: false, message: error.message});
    }
}


module.exports.logout = async(req, res)=>{
    try{
        res.clearCookie('token', {
             httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        })

        return res.json({success: true, message: "Logged Out"});

    }catch(error){
        return res.json({success: false, message: error.message});
    }
}

// send verification OTP to user's email
module.exports.sendVerifyOtp = async(req, res) =>{
    try{
        const userId = req.userId;

        const user = await userModel.findById(userId);

        if(user.isAccVerified){
            return res.json({success: false, message: "Account already verified"});
        }

        const otp = String(Math.floor(100000 + Math.random()*900000));

        user.verifyOTP = otp;
        user.verifyOTPExpireAt = Date.now() + 24 * 60 * 60 * 1000; // 24hours

        await user.save();

         const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Account verification OTP",
            text: `Your OTP is ${otp}. Verify your account using this OTP.`
        };

        await transporter.sendMail(mailOptions);

        return res.json({success: true, message: "Verification otp send on email"});
       
    }catch(error){
        res.json({success: false, message: error.message});
    }
};

module.exports.verifyEmail = async(req, res)=>{
    const userId = req.userId; 
    const { otp } = req.body;

    if( !otp){
        return res.json({success: false, message: "Missing Details"});
    }

    try{
        const user = await userModel.findById(userId);
        if(!user){
            return res.json({success: false, message: "User not found"});
        }

        if(user.verifyOTP === '' || user.verifyOTP !== otp){
            return res.json({success: false, message: "Invalid OTP"});
        }

        if(user.verifyOTPExpireAt < Date.now()){
            return res.json({success, message: "OTP Expired"});
        }

        user.isAccVerified = true;
        user.verifyOTP = '';
        user.verifyOTPExpireAt = 0;

        await user.save();
        return res.json({success: true, message: "Email verified successfully"});

    }catch(error){
        res.json({success: false, message: error.message});
    }
}

// check if user is authenticated
module.exports.isAuthenticated = async(req, res)=>{
    try{
        return res.json({success: true})
    }catch(error){
        res.json({success: false, message: error.message});
    }
}

module.exports.sendResetOtp = async(req, res)=>{
    const {email} = req.body;

    if(!email){
            return res.json({success: false, message: "Email is required"});
        }

    try{
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success: false, message: "User not found"});
        }

        const otp = String(Math.floor(100000 + Math.random()*900000));

        user.resetOTP = otp;
        user.resetOTPExpireAt = Date.now() + 15 * 60 * 1000; // 15 minutes

        await user.save();

         const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Password Reset OTP",
            text: `Your OTP for resetting your password is ${otp}. Use this OTP to proceed with resetting your password.`
        };

        await transporter.sendMail(mailOptions);

        return res.json({success: true, message: "Reset otp send to your email"});

    }catch(error){
        res.json({success: false, message: error.message});
    }
}

// Reset user password
module.exports.resetPassword = async(req, res)=>{
    const {email, otp, newPassword} = req.body;

    if(!email || !otp || !newPassword){
        return res.json({success: false, message: "Email, OTP and new password are required."});
    }

    try{

        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success: false, message: "User not found"});
        }

        if(user.resetOTP === "" || user.resetOTP !== otp){
            return res.json({success: false, message: "Invalid OTP"});
        }

        if(user.resetOTPExpireAt < Date.now()){
            return res.json({success: false, message: "OTP expired"});
        }
        
        // encrypt the new password for storage
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetOTP = '';
        user.resetOTPExpireAt = 0;

        await user.save();

        res.json({success: true, message: "Password has been reset successfully"});

    }catch(error){
        res.json({success: false, message: error.message});
    }
}