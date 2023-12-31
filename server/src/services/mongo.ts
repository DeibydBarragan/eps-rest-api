import 'dotenv/config'
import { connect } from 'mongoose'

const connectToMongo = (): void => {
  const MONGO_URI = process.env.MONGO_URI
  connect(MONGO_URI!)
    .then(() => {
      console.log('Connected to MongoDB')
    })
    .catch((error) => {
      console.log('Error connecting to MongoDB:', error.message)
      throw new Error('Error conecting to MongoDB')
    })
}

export default connectToMongo
