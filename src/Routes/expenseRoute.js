import Router from 'express'
const router=Router()
import {addExpense,allExpense,deleteExpense,totlExpense} from '../controllers/expenseController.js'
import { wrapAsync } from '../middlewares/wrapasync.js';
import { validate } from '../middlewares/zodValidation.js';

router.post("/expense",validate,wrapAsync(addExpense));

router.get("/expense",wrapAsync(allExpense))

router.delete("/expense/:id",wrapAsync(deleteExpense))

router.get("/expense/total",wrapAsync(totlExpense))


export default router;