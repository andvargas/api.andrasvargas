const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const contentSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 5
    },
    path: {
        type: String,
        required: true,
        unique: true
    },
    abstract: { type: String },
    resourceBox: { type: String },
    body: { type: String },
    image: { type: Buffer }
}, {
    timestamps: true
})

const Content = mongoose.model('Content', contentSchema)

module.exports = Content