const userModel = require("../model/user");

module.exports.getUserData = async(req, res)=>{
    try{
        // Access the ID set in userAuth
        const userId = req.userId;

        const user = await userModel.findById(userId);
        if(!user){
            return res.json({success: false, message: "User not found"});
        }

        res.json({
            success: true,
            userData: {
                name: user.name,
                isAccVerified: user.isAccVerified,
            }
        });
    }catch(error){
        res.json({success: false, message: error.message});
    }
}

