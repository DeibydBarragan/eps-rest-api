import { Request, Response, Router } from "express"
import { listAppointments, postAppointment } from "../controllers/appointment"
import { validatePostAppointment } from "../validators/appointments"

const appointmentRoutes = Router()

/**
 * http://localhost:PORT/api/appointments
 * Get appointments
 * [GET]
 */
appointmentRoutes.get("/api/appointments", listAppointments)

/**
 * [POST]
 * Create a appointment
 */
appointmentRoutes.post("/api/appointments", validatePostAppointment, postAppointment)

export default appointmentRoutes