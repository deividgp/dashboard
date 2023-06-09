import mongoose from 'mongoose'

mongoose.Promise = global.Promise

const dbUrl = 'mongodb://localhost/user'

const connect = async () => {
  mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  const db = mongoose.connection
  db.on('error', () => {
    console.log('could not connect')
  })
  db.once('open', () => {
    console.log('> Successfully connected to database')
  })
}
export default connect
