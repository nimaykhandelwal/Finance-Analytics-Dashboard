// controllers/transactionController.ts
import { RequestHandler } from 'express'
import Transaction from '../models/Transaction'
import { exportToCsv } from '../utils/csvExporter'

/**
 * GET /api/transactions
 */
export const getTransactions: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const txs = await Transaction.find({})
        res.json(txs)
        return
    } catch (err) {
        next(err)
        return
    }
}

/**
 * POST /api/transactions
 */
export const createTransaction: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const newTx = await Transaction.create(req.body)
        res.status(201).json(newTx)
        return
    } catch (err) {
        next(err)
        return
    }
}

/**
 * PUT /api/transactions/:id
 */
export const updateTransaction: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const { id } = req.params
        const updated = await Transaction.findByIdAndUpdate(id, req.body, { new: true })
        if (!updated) {
            res.status(404).json({ message: 'Transaction not found' })
            return
        }
        res.json(updated)
        return
    } catch (err) {
        next(err)
        return
    }
}

/**
 * DELETE /api/transactions/:id
 */
export const deleteTransaction: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const { id } = req.params
        const deleted = await Transaction.findByIdAndDelete(id)
        if (!deleted) {
            res.status(404).json({ message: 'Transaction not found' })
            return
        }
        res.json({ message: 'Transaction deleted' })
        return
    } catch (err) {
        next(err)
        return
    }
}

/**
 * POST /api/transactions/export
 */
export const downloadCsv: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const cols: string[] = req.body.columns
        const all = await Transaction.find({})
        const buf = await exportToCsv(all, cols)
        res
            .header('Content-Disposition', 'attachment; filename=transactions.csv')
            .type('text/csv')
            .send(buf)
        return
    } catch (err) {
        next(err)
        return
    }
}
