import express from 'express'
const app=express()
const port=8000
import expenseRouter from './Routes/expenseRoute.js'
import {errorHandler} from './middlewares/errorHandler.js'

app.use(express.json())

app.use("/",expenseRouter)

app.use(errorHandler)

export default app;