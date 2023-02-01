import mongoose from 'mongoose'

const { model, Schema } = mongoose

const starSchema = new Schema({
    name: {
        type: String,
        required: true 
    },
    birthDate: {
        type: Date,
        required: true
    },
    birthPlace: {
        type: String,
        required: true
    },
    funFacts: {
        type: String
    },
    wikipediaLink: {
        type: String
    },
    picture: {
        type: String
    },
    movies: {
        type: Array
    }
}, { timestamps: true })

export default model('Star', starSchema)