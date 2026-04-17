const Product=require('../model/product');
exports.getNewProductByFormFilling=async(req,res)=>{
    const {category, title, description, image, ratePerDay, securityDeposit, locationTag, condition}=req.body;
    const newProduct=new Product({
               category,
               title,
               description,
               image:image||undefined,
               pricing:{
                ratePerDay:Number(ratePerDay),
                securityDeposit:Number(securityDeposit)|| 0,
               },
               locationTag,
               condition,
               status:"AVAILABLE"   
    })
    await newProduct.save();
    res.status(201).json({message:"Product is successfully saved",product:newProduct});
};