import dotenv from 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDb from './config/db.connection.js'
import Movie from './models/Movie.model.js'

const app = express()
connectDb()

app.use(express.json())
app.use(cors())

app.post('/movies', async (req, res) => {
    const payload = req.body
    try {
        const newMovie = await Movie.create(payload)
        return res.status(201).json(newMovie)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Error while creating movie"})
    }
})


app.listen(process.env.PORT, () => console.log('Server listening on port: ', process.env.PORT))