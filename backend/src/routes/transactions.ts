import { Router } from 'express';
import verifyToken from '../middleware/verifyToken';
import {
    getTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    downloadCsv,
} from '../controllers/transactionController';

const router = Router();

// list
router.get('/', verifyToken, getTransactions);
// create
router.post('/', verifyToken, createTransaction);
// update
router.put('/:id', verifyToken, updateTransaction);
// delete
router.delete('/:id', verifyToken, deleteTransaction);
// csv export
router.post('/export', verifyToken, downloadCsv);

export default router;
