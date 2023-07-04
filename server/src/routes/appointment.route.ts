import { Request, Response, Router } from "express"
import { listAppointments, postAppointment, searchAppointmentsByDoctorCedula, searchAppointmentsByPatientCedula } from "../controllers/appointment"
import { validatePostAppointment } from "../validators/appointments"

const appointmentRoutes = Router()

/**
 * http://localhost:PORT/api/appointments
 * Get appointments
 * [GET]
 */
appointmentRoutes.get("/api/appointments", listAppointments)

/**
 * http://localhost:PORT/api/appointments/patient/:cedula
 * Get appointments by cedula
 * [GET]
 */
appointmentRoutes.get("/api/appointments/patient/:cedula", searchAppointmentsByPatientCedula)

/**
 * http://localhost:PORT/api/appointments/doctor/:cedula
 * Get appointments by cedula
 * [GET]
 */
appointmentRoutes.get("/api/appointments/doctor/:cedula", searchAppointmentsByDoctorCedula)

/**
 * [POST]
 * Create a appointment
 */
appointmentRoutes.post("/api/appointments", validatePostAppointment, postAppointment)

export default appointmentRoutes