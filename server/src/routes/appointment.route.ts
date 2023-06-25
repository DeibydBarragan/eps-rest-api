import { Request, Response, Router } from "express"
import { listAllAppointments, postAppointment } from "../controllers/appointment"
import { validatePostAppointment } from "../validators/appointments"

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
appointmentRoutes.post("/api/appointments", validatePostAppointment, postAppointment)

export default appointmentRoutes