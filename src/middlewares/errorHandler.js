export const errorHandler=(err,req,res,next)=>{
   console.log(err);

   res.status(err.status || 500).send({
        success: false,
        message: err.message || "Internal Server Error",
        data: null
    });
   
}