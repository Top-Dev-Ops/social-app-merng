const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { UserInputError } = require('apollo-server')

const User = require('../../models/User')
const { SECRET_KEY } = require('../../config')
const { validateRegisterInput, validateLoginInput } = require('../../util/validators')

function generateToken(user) {
  return jwt.sign({
    id: user.id,
    name: user.name,
    email: user.email,
  }, SECRET_KEY, { expiresIn: '1h' })
}

module.exports = {
  Mutation: {
    async register(_, { registerInput: { name, password, email }}, context, info) {
      // validate
      const { valid, errors } = validateRegisterInput(name, email, password)
      if (!valid) throw new UserInputError('Errors', { errors })

      // check if user already exists
      const user = await User.findOne({ name })
      if (user) throw new UserInputError('User name is taken.', {
        errors: {
          name: 'The user name is taken.'
        }
      })

      // hash password & store in db, get jwt token
      password = await bcrypt.hash(password, 12)

      const newUser = new User({
        name,
        email,
        password,
        createdAt: new Date().toISOString()
      })

      const res = await newUser.save()

      const token = generateToken(res)

      return {
        ...res._doc,
        id: res._id,
        token,
      }
    },
    async login(_, { name, password }) {
      const { valid, errors } = validateLoginInput(name, password)
      if (!valid) throw new UserInputError('Errors', { errors })
  
      const user = await User.findOne({ name })
  
      if (!user) {
        errors.general = 'User not found.'
        throw new UserInputError('Wrong credentials', { errors })
      }
  
      const match = await bcrypt.compare(password, user.password)
      if (!match) {
        errors.general = 'Wrong credentials.'
        throw new UserInputError('Wrong credentials', { errors })
      }
  
      const token = generateToken(user)
  
      return {
        ...user._doc,
        id: user._id,
        token,
      }
    },
  },
}
