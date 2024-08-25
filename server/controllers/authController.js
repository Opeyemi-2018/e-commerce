import { User } from '../models/userModels.js'
import { errorHandler } from '../utils/error.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

export let signUp = async (req, res, next) => {
    let {username, email, password,  isVendor} = req.body
    if(!username || !email || !password){
        return next(errorHandler(400, 'please provide all required fields'))
    }
    let hashedPassword = bcryptjs.hashSync(password, 10)
    let newUser = new User ({username, email, password: hashedPassword,  isVendor})

    try {
        await newUser.save()
        res.status(201).json('User created successfully')
    } catch (error) {
        next(error)
    }
}

export let signIn = async (req, res, next) => {
    let {email, password} = req.body
    if(!email || !password){
        return next(errorHandler(404, 'all fields required!'))
    }
    
    try {
        let validUser = await User.findOne({email})
        if(!validUser) return next(errorHandler(401, 'User not found'))
    
        let validPassword = bcryptjs.compareSync(password, validUser.password)
        if(!validPassword) return next(errorHandler(401, 'wrong credentials'))

        let token = jwt.sign({id: validUser._id, isAdmin: validUser.isAdmin, isVendor: validUser.isVendor}, process.env.JWT_SECRET)
        let {password: pass, ...rest} = validUser._doc

        res.cookie('access_token', token, {httpOnly: true})
        .status(200).json(rest)
    } catch (error) {
        next(error)
    }
}