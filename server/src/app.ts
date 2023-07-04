import "dotenv/config"
import express from "express"
import cors from "cors"
import patientRoutes from "./routes/patient.route"
import appointmentRoutes from "./routes/appointment.route"
import doctorRoutes from "./routes/doctor.route"
import connectToMongo from "./services/mongo"

const PORT = process.env.PORT || 8000

const app = express()

app.use(cors())
app.use(express.json())

// Routes
app.use(patientRoutes)
app.use(appointmentRoutes)
app.use(doctorRoutes)

// Connect to MongoDB
connectToMongo()

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`Go to http://localhost:${PORT}`)
})