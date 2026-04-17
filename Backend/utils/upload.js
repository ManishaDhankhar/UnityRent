const {S3Client}=require("@aws-sdk/client-s3");
const multer=require("multer");
const multerS3=require("multer-s3");
require ('dotenv').config();

// Intialize s3 client 
const s3= new S3Client({
    region:process.env.AWS_REGION,
    credentials:{
        accessKeyId:process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY,
    },
})

// Streaming storage process define
const upload = multer({
    storage:multerS3({
        s3:s3,
        bucket:process.env.AWS_BUCKET_NAME,
        acl:'public-read',
        contentType:multerS3.AUTO_CONTENT_TYPE,
        key:function(req,file,cb){
            // This saves files in a sub-folder called 'returns' with a unique timestamp
          const fileName = `returns/${Date.now()}_${file.originalname}`;
          cb(null, fileName);
        },
    }),
    limits: { fileSize: 15 * 1024 * 1024 },
})

module.exports=upload;