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

exports.verifyReturn=async(req,res)=>{

   try{
      // get url
      const id=req.params.bookingId;
      // check multers3 save file or not
      if(!req.file)return res.status(400).json({message:"No video file received from AWS"});

      // location of s3 
      const s3url=req.file.location;

      const updatedItem = await Product.findByIdAndUpdate(
            id, 
            { 
                returnVideoUrl: s3url, 
                status: 'returned' // Optional: update status to show item is back
            }, 
            { new: true } // Returns the updated document
        );

        if (!updatedItem) {
            return res.status(404).json({ message: "Product record not found to update" });
        }

        res.status(200).json({
            success: true,
            message: "Video saved to Cloud & MongoDB successfully!",
            videoUrl: s3url,
            data: updatedItem
        });

   }catch(err){
      console.log("Internal server err",err);
      res.status(500).json({message: "Internal Server Error", error: err.message})
   }
}