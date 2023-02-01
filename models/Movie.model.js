import mongoose from 'mongoose'

const { model, Schema } = mongoose

const movieSchema = new Schema({
    title: {
        type: String,
        required: true 
    },
    year: {
        type: Number,
        required: true
    },
    director: {
        type: Array,
        required: true
    },
    synopsis: {
        type: String,
        required: true
    },
    cast: {
        type: Array,
        required: true
    },
    poster: {
        type: String
    },
    duration: {
        type: Number,
        required: true
    },
    countries: {
        type: Array,
        required: true
    }
}, { timestamps: true })

export default model('Movie', movieSchema)