import { Router } from 'express'
import bcrypt from 'bcryptjs'
import User from '../models/User.model.js'

const authRouter = Router()

authRouter.post('/sign-up', async (req, res) => {
    const { email, password } = req.body

    try {

        const userExists = await User.findOne({email})
        if(userExists) {
            throw new Error('User exists')
        }

        const salt = bcrypt.genSaltSync(+process.env.SALT_ROUNDS)
        const passwordHash = bcrypt.hashSync(password, salt)

        const newUser = await User.create({ email, passwordHash })
        if(newUser) {
            return res.status(201).json({message: 'User Created'})
        }
    } catch (error) {
        console.log(error)

        if(error.message === 'User exists') {
            return res.status(409).json({message: 'Revise os dados enviados'})
        }
        return res.status(500).json({message: 'Internal Server Error'})
    }
})

export default authRouter