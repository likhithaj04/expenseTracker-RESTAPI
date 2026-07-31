import express from 'express'

export const addExpense=(req,res)=>{
const {title,amount,catogary,date}=req.body;



  res.send({message:"success",data:{title,amount,catogary,date}})

}

