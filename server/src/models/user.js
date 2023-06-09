import { mongoose, Schema } from 'mongoose'
import bcrypt from 'bcryptjs'

const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

UserSchema.pre('save', async function (next) {
  try {
    const user = this
    if (!user.isModified('password')) next()
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword
    next()
  } catch (error) {
    return next(error)
  }
})

const user = mongoose.model('User', UserSchema)
export default user
