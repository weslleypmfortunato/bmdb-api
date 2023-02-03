import { Router } from 'express'
import Star from '../models/Star.model.js'

const starsRouter = Router()

starsRouter.post('/', async (req, res) => {
    const payload = req.body
    try {
        const newStar = await Star.create(payload)
        return res.status(201).json(newStar)
    } catch (error) {
        if(error.name === 'ValidationError') {
            return res.status(422).json({message: "Validation error. Check your input."})
        }
        return res.status(500).json({message: "Error while creating movie"})
    }
})

starsRouter.get('/', async (req, res) => {
    try {
        const stars = await Star.find({})
        return res.status(200).json(stars)
    } catch (error) {
        return res.status(500).json({message: "Internal server error"})
    }
})

starsRouter.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const star = await Star.findById(id)
        if(!star) {
            return res.status(404).json({message: 'Not Found'})
        }
        return res.status(200).json(star)
    } catch (error) {
        return res.status(500).json({message: "Internal server error"})
    }
})
starsRouter.put('/:id', async (req, res) => {
    const { id } = req.params
    const payload = req.body
    try {
        const updatedStar = await Star.findOneAndUpdate({_id: id}, payload, { new: true })
        if(!updatedStar) {
            return res.status(404).json({message: 'Not Found'})
        }
        return res.status(200).json(updatedStar)
    } catch (error) {
        return res.status(500).json({message: "Internal server error"})
    }
})
starsRouter.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        await Star.findOneAndDelete({_id: id})
        return res.status(204).json()
    } catch (error) {
        return res.status(500).json({message: "Internal server error"})
    }
})

export default starsRouter