import dotenv from 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDb from './config/db.connection.js'
import Star from './models/Star.model.js'
import moviesRouter from './routes/movies.routes.js'
import starsRouter from './routes/stars.routes.js'

const app = express()
connectDb()


app.use(cors())
app.use(express.json())
app.use('/movies', moviesRouter)
app.use('/stars', starsRouter)

app.listen(process.env.PORT, () => console.log('Server listening on port: ', process.env.PORT))