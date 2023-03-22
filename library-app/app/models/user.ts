import { model, Schema } from "mongoose";

export interface IUser {
    id?: string;
    yandexId?: string;
    username: string;
    email: string;
    password: string;
}

export const UserSchema = model('User', new Schema<IUser>({
    yandexId: {
        type: String,
        required: false
    },
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
        required: false
    },
}));