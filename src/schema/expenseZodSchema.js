import { z } from 'zod'

export const expenseSchema = z.object({
    title: z.string().trim().min(1, "Title is required").max(100, 'title cannot exceed 100 charecters'),
    amount: z.number({
        required_error: "Amount is required",
        inavlid_type_error: "Amount must be number"
    }).positive("amount must be positive"),


    category: z.string().trim().min(1, "Category is required"),

    date: z.iso.date({ message: "Date must be in YYYY-MM-DD format" })
})

