const Product=require("../model/product");

exports.getProductById=async(req,res)=>{
     try{
        const item=await Product.findById(req.params.id);
        if(!item)return res.status(404).json({message:"Product is not found"});
        res.json(item);
     }catch(err){
        res.status(500).json({message:"Server error"},err);
     }
};