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

  res.status(200).json({ message: "success", data: newExpense })

}


 export const allExpense=async(req,res)=>{
   const {category}=req.query;
   const data=await fs.readFile(filePath,"utf-8")
  const expense=JSON.parse(data)
// console.log(expense);

   if(category){
      const fileterdData=expense.filter(item=>item.category==category)
         res.status(200).json({"success":true,
          message:fileterdData.length>0?"Expenses retrieved successfully":`No Expense found for this ${category}`,
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

export const totlExpense=async(req,res)=>{
  const {category}=req.query;

  const data=await fs.readFile(filePath,"utf-8")
  const allExpense=JSON.parse(data)
  
   if(category){
     const filteredCategory= allExpense.filter(item=>item.category==category)
// const total=categorytotal.map(item=>item.amount)    

const categorytotal=filteredCategory.reduce((acc,curr)=>{
  return acc+curr.amount
},0)
 res.status(200).json({
      "success":true,message:`${category} data fetched successfully`,data:categorytotal
    })
   }  
   else{
    const total=allExpense.reduce((acc,curr)=>{
      return acc+curr.amount
    },0)
    res.status(200).json({
      "success":true,message:"Total expense fetched successfully",data:total
    })
   }
}


export const getMonthlySummary = async (req, res) => {
    const { month } = req.query;

    const data = await fs.readFile(filePath, "utf-8");
    const expenses = JSON.parse(data);

    const monthlyExpenses = expenses.filter(expense =>
        expense.date.startsWith(month)
    );

    const totalExpenses = monthlyExpenses.reduce((sum, expense) => sum + expense.amount,
        0);

    const highestExpense = monthlyExpenses.reduce((max, expense) =>expense.amount > max.amount ? expense : max);
  
    const lowestExpense = monthlyExpenses.reduce((min, expense) =>expense.amount < min.amount ? expense : min);

    res.send({
        success: true,
        message: "Monthly summary retrieved successfully",
        data: {
            month,
            totalExpenses,
            numberOfExpenses: monthlyExpenses.length,
            highestExpense: {
                title: highestExpense.title,
                amount: highestExpense.amount,
                category: highestExpense.category
            },
            lowestExpense: {
                title: lowestExpense.title,
                amount: lowestExpense.amount,
                category: lowestExpense.category
            }
        }
    })
  }