const { Schema, model } = require('mongoose');

const BookDiscussionMessageSchema = new Schema({
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
});

exports.BookDiscussionMessageSchema = model('BookDiscussionMessage', BookDiscussionMessageSchema);