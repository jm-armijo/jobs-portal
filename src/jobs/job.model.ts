import * as mongoose from 'mongoose';

export const JobSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    expiredAt: {type: Date, required: true},
    companyId: {type: String, required: true},
});

export interface Job extends mongoose.Document {
    id: string;
    title: string;
    description: string;
    expiredAt: Date;
    companyId: string;
}
