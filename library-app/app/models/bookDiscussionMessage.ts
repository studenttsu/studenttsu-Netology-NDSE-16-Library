import { model, Schema } from "mongoose";

export const BookDiscussionMessageSchema = model('BookDiscussionMessage', new Schema({
    bookId: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    authorId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: true
    },
}, {
    timestamps: true
}));