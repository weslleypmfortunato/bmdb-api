import { Router } from 'express'
import Movie from '../models/Movie.model.js'

const moviesRouter = Router()

moviesRouter.post('/', async (req, res) => {
    const payload = req.body
    try {
        const newMovie = await Movie.create(payload)
        return res.status(201).json(newMovie)
    } catch (error) {
        if(error.name === 'ValidationError') {
            return res.status(422).json({message: "Validation error. Check your input."})
        }
        return res.status(500).json({message: "Error while creating movie"})
    }
})

moviesRouter.get('/', async (req, res) => {
    const { year, order } = req.query
    const query = {}
    if(year) {
        query.year = year
    }
    try {
        const movies = await Movie.find(query).select({ title: 1, year: 1, _id: 0}).sort(order)
        return res.status(200).json(movies)
    } catch (error) {
        return res.status(500).json({message: "Internal server error"})
    }
})

moviesRouter.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const movie = await Movie.findById(id)
        if(!movie) {
            return res.status(404).json({message: 'Not Found'})
        }
        return res.status(200).json(movie)
    } catch (error) {
        return res.status(500).json({message: "Internal server error"})
    }
})
moviesRouter.put('/:id', async (req, res) => {
    const { id } = req.params
    const payload = req.body
    try {
        const updatedMovie = await Movie.findOneAndUpdate({_id: id}, payload, { new: true })
        if(!updatedMovie) {
            return res.status(404).json({message: 'Not Found'})
        }
        return res.status(200).json(updatedMovie)
    } catch (error) {
        return res.status(500).json({message: "Internal server error"})
    }
})
moviesRouter.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        await Movie.findOneAndDelete({_id: id})
        return res.status(204).json()
    } catch (error) {
        return res.status(500).json({message: "Internal server error"})
    }
})

export default moviesRouter