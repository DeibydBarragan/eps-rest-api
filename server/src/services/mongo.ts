import "dotenv/config"
import { connect, ConnectOptions } from "mongoose"

const connectToMongo = () => {
  const MONGO_URI = process.env.MONGO_URI
  connect(MONGO_URI!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  .then(() => {
    console.log("Connected to MongoDB")
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error.message)
  })
}

export default connectToMongo