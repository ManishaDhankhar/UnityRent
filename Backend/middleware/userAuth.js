var jwt = require('jsonwebtoken');

// finding userid from cookie through token
const  userAuth = async(req, res, next)=>{
    const {token} = req.cookies;

    if(!token){
        return res.json({success: false, message: "Not authorized. Login again"});
    }

    try{
        // decoding the token we are getting from the cookie
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        if(tokenDecode.id){
            req.userId = tokenDecode.id;
        }else{
            return res.json({success: false, message: "Not authorized. Login again"});
        }

        next();

    }catch(error){
        res.json({success: false, message: error.message});
    }
}


module.exports = userAuth;


