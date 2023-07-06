import { Router } from "express"
import { deleteAppointment, listAppointments, postAppointment, searchAppointmentsByDoctorCedula, searchAppointmentsByPatientCedula } from "../controllers/appointment"
import { validatePostAppointment } from "../validators/appointments/postAppointment"
import { validateDeleteAppointment } from "../validators/appointments/deleteAppointment"

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

/**
 * [DELETE]
 * Create a appointment
 */
appointmentRoutes.delete("/api/appointments/:id", validateDeleteAppointment, deleteAppointment)

export default appointmentRoutes