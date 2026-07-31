import express from 'express'

export const addExpense=(req,res)=>{
    console.log("hit");
    
 const {title,amount,category,date}=req.body;



  res.send({message:"success",data:{title,amount,category,date}})

}

