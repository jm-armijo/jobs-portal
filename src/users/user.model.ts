import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    companyId: {type: String, required: true},
    name: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, required: true},
});

export interface User extends mongoose.Document {
    id: string;
    companyId: string;
    name: string;
    username: string;
    password: string;
    role: string;
}
