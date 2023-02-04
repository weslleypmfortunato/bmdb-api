import dotenv from 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDb from './config/db.connection.js'
import moviesRouter from './routes/movies.routes.js'
import starsRouter from './routes/stars.routes.js'
import authRouter from './routes/auth.routes.js'
import commentsRouter from './routes/comments.routes.js'

const app = express()
connectDb()


app.use(cors())
app.use(express.json())
app.use('/movies', moviesRouter)
app.use('/stars', starsRouter)
app.use(commentsRouter)
app.use(authRouter)

app.listen(process.env.PORT, () => console.log('Server listening on port: ', process.env.PORT))