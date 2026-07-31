import Router from 'express'
const router=Router()
import {addExpense} from '../controllers/expenseController.js'
import { wrapAsync } from '../middlewares/wrapasync.js';
import { validate } from '../middlewares/zodValidation.js';

router.post("/addExpense",validate,wrapAsync(addExpense));

export default router;