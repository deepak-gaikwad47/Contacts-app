import * as mongoose from 'mongoose';
import { genderOptions } from '../libs/constants.js';

const { Schema } = mongoose;
const contactSchema = new Schema({
    id: {
        type: String,
        unique: true
    },
    firstName: {
        type: String,
        required: true,
        match: /^[A-Za-z]{3,}$/
    },
    lastName: {
        type: String,
        required: true,
        match: /^[A-Za-z]{3,}$/
    },
    gender: {
        type: String,
        required: true,
        enum: genderOptions
    },
    address: {
        line1: {
            type: String,
            required: true,
            minLength: 8
        },
        line2: {
            type: String
        },
        city: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true,
            match: /^[A-Za-z -]+$/,
            maxLength: 50
        },
        zipCode: {
            type: String,
            required: true,
            maxLength: 10
        }
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        match: /^[0-9]{10}$/
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
})

export default mongoose.model("Contact", contactSchema)
