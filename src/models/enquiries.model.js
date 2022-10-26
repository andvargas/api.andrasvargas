const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;

const enquirySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    notes: { type: String, required: true }
}, {
    timestamps: true,
});

const Enquiry = mongoose.model('Enquiry', enquirySchema);

module.exports = Enquiry;