import express from 'express'
import fs from 'fs/promises'
import { randomUUID } from 'crypto'

const filePath = "./src/data/expenses.json"

export const addExpense = async (req, res) => {

  const { title, amount, category, date } = req.body;
  const newExpense = {id:randomUUID(), title, amount, category, date }

  const data = await fs.readFile(filePath, "utf-8")

  const allExpenses = JSON.parse(data);

  allExpenses.push(newExpense)

  await fs.writeFile(
    filePath,JSON.stringify(allExpenses, null, 2));

  // console.log(allExpenses);

  res.status(200).json({ message: "success", data: { title, amount, category, date } })

}


 export const allExpense=async(req,res)=>{
   const {category}=req.query;
   const data=await fs.readFile(filePath,"utf-8")
  const expense=JSON.parse(data)
// console.log(expense);

   if(category){
      const fileterdData=expense.filter(item=>item.category==category)
         res.status(200).json({"success":true,
          message:fileterdData.length>0?"Expenses retrieved successfully":"No Expense found for this category",
          data:fileterdData})

   }
   else{
   res.status(200).json({"success":true,data:expense})
   }
 
}

export const deleteExpense=async(req,res)=>{
const {id}=req.params
  const data=await fs.readFile(filePath,"utf-8")
  const allExpense=JSON.parse(data)
   
  const expense=allExpense.find(item=>item.id===id)
if(expense){
   const updated=allExpense.filter(item=>item!==expense)   
    await fs.writeFile(
    filePath,JSON.stringify(updated, null, 2));
    res.status(200).json({"success":true,message:"Expense Deleted Successfully"})
}  
else{
  res.status(400).json({"success":false,message:"Data not found"})
}
  
}

export const totlExpense=(req,res)=>{
  const {category}=req.query;
  console.log(category);
  
}
