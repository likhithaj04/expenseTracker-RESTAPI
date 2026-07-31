import Router from 'express'
const router=Router()
import {addExpense} from '../controllers/expenseController.js'
import { wrapAsync } from '../middlewares/wrapasync.js';

router.post("/addExpense",wrapAsync(addExpense));

export default router;