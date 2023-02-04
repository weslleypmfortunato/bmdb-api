import mongoose from 'mongoose'

const { model, Schema } = mongoose

const movieSchema = new Schema({
    title: {
        type: String,
        required: true 
    },
    year: {
        type: Number,
        required: [true, 'O ano é obrigatório.']
    },
    director: {
        type: Array,
        required: true
    },
    synopsis: {
        type: String,
        required: true
    },
    cast: [{
        type: Schema.Types.ObjectId,
        ref: "Star"
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }],
    poster: {
        type: String
    },
    duration: {
        type: Number,
        required: true
    },
    countries: {
        type: Array,
        validate: {
            validator: function(value) {
               return value.includes('Brasil')
            },
            message: () => 'Brasil deve estar presente.'
        },
        required: true
    }
}, { timestamps: true })

export default model('Movie', movieSchema)