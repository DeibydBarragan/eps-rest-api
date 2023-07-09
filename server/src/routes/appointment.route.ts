import { Router } from "express"
import { deleteAppointment, listAppointments, putAppointment, postAppointment, searchAppointmentsByDoctorCedula, searchAppointmentsByPatientCedula } from "../controllers/appointment"
import { validatePostAppointment } from "../validators/appointments/postAppointment"
import { validateDeleteAppointment } from "../validators/appointments/deleteAppointment"
import { validatePutAppointment } from "../validators/appointments/putAppointment"

const appointmentRoutes = Router()

/**
 * http://localhost:PORT/api/appointments
 * Get appointments
 * [GET]
 */
appointmentRoutes.get("/api/appointments", listAppointments)

/**
 * http://localhost:PORT/api/appointments/patient/:cedula
 * Get appointments by patient cedula
 * [GET]
 */
appointmentRoutes.get("/api/appointments/patient/:cedula", searchAppointmentsByPatientCedula)

/**
 * http://localhost:PORT/api/appointments/doctor/:cedula
 * Get appointments by doctor cedula
 * [GET]
 */
appointmentRoutes.get("/api/appointments/doctor/:cedula", searchAppointmentsByDoctorCedula)

/**
 * [POST]
 * Create a appointment
 */
appointmentRoutes.post("/api/appointments", validatePostAppointment, postAppointment)

/**
 * [PATCH]
 * Update a appointment
 */
appointmentRoutes.put("/api/appointments/:id", validatePutAppointment, putAppointment)

/**
 * [DELETE]
 * Create a appointment
 */
appointmentRoutes.delete("/api/appointments/:id", validateDeleteAppointment, deleteAppointment)

export default appointmentRoutes