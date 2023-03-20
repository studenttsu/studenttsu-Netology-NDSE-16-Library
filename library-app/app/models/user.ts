import { model, Schema } from "mongoose";

export interface IUser {
    id: string;
    username: string;
    email: string;
    password: string;
}

export const UserSchema = model('User', new Schema<IUser>({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
}));