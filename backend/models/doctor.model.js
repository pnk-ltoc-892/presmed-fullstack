import mongoose, { Schema } from "mongoose";


const doctorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    speciality: {
        type: String,
        required: true
    },
    degree: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    available: {
        type: Boolean,
        required: true
    },
    fee: {
        type: Number,
        required: true
    },
    address: {
        type: Object,
        required: true
    },
    date: {
        type: Number,
        required: true
    },
    slotsBooked: {
        type: Object,
        default: {}
    }
}, {minimize: false})   // To Allow Creating Empty Object

export const Doctor = mongoose.models.Doctor || mongoose.model('Doctor', doctorSchema)