import { Router } from "express";
import Comment from '../models/Comment.model.js'
import Movie from '../models/Movie.model.js'

const commentsRouter = Router()

commentsRouter.post('/movies/:movieId/comments', async (req, res) => {
    const { movieId } = req.params
    const payload = req.body
    try {
        const newComment = await Comment.create(payload)
        const movie = await Movie.findOneAndUpdate({_id: movieId}, {$push: {comments: newComment._id}})
        return res.status(201).json(newComment)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Internal Server Error'})
    }
})

export default commentsRouter