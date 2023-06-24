import { Request, Response, Router } from "express"
import { listAllAppointments, postAppointment } from "../controllers/appointment"

const appointmentRoutes = Router()

/**
 * http://localhost:PORT/api/appointments
 * Get all appointments
 * [GET]
 */
appointmentRoutes.get("/api/appointments", listAllAppointments)

/**
 * [POST]
 * Create a appointment
 */
appointmentRoutes.post("/api/appointments", postAppointment)

export default appointmentRoutes