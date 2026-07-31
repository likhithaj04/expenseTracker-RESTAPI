import { expenseSchema } from "../schema/expenseZodSchema.js";

export const validate=(req,res,next)=>{
    const result=expenseSchema.safeParse(req.body);

    if(!result.success){
            

        return res.send({
            "success":"false",
            "messsage":result.error.issues.map((issue)=>({
                field:issue.path[0],
                messsage:issue.message
            }))//object
        })
    }
    
    req.body = result.data;
  next();
}