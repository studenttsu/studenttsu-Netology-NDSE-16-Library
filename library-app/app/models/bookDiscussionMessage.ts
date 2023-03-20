import { model, Schema } from "mongoose";

export interface IBookDiscussionMessage {
    bookId: string;
    authorId: string;
    message: string;
    createdAt: string;
    updatedAt: string;
}

export const schema = new Schema<IBookDiscussionMessage>({
    bookId: {
        type: String,
        required: true
    },
    authorId: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

export const BookDiscussionMessageSchema = model('BookDiscussionMessage', schema);