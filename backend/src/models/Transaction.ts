import { Schema, model, Document } from 'mongoose';

export interface ITransaction extends Document {
    date: Date;
    amount: number;
    category: 'Revenue' | 'Expense';
    status: 'Paid' | 'Pending';
    user_id: string;
    user_profile: string;
}

const TransactionSchema = new Schema<ITransaction>({
    date: { type: Date, required: true },
    amount: { type: Number, required: true },
    category: { type: String, enum: ['Revenue', 'Expense'], required: true },
    status: { type: String, enum: ['Paid', 'Pending'], required: true },
    user_id: { type: String, required: true },
    user_profile: { type: String, required: true }
});

export default model<ITransaction>('Transaction', TransactionSchema);
