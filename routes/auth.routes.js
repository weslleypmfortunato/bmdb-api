import { Router } from 'express'
import User from '../models/User.model.js'
import bcrypt from 'bcryptjs'

const authRouter = Router()

authRouter.post('/sign-up', async (req, res) => {
  const { email, password} = req.body
  try {

    const userExists = await User.findOne({email})
    if (userExists) {
      throw new Error('User already exists')
    }

    const salt = bcrypt.genSaltSync(+process.env.SALT_ROUNDS)
    const passwordHash = bcrypt.hashSync(password, salt)


    const newUser = await User.create({ email, passwordHash })
    if (newUser) {
      return res.status(201).json({message: 'User created'}) // aqui é para "esconder" a senha que o user digitou

    }
  } catch (error) {
    console.log(error)
    if (error.message === 'User already exists') {
      return res.status(409).json({message: 'Check added data'})
    }
    return res.status(500).json({message: 'Internal Server Error'})
  }
})

export default authRouter