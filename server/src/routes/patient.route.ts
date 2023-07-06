import { Router } from "express"
import { deletePatient, listPatients, postPatient } from "../controllers/patient"
import { validatePostPatient } from "../validators/patients/patients"
import { validateDeletePatient } from "../validators/patients/deletePatient"

const patientRoutes = Router()

/**
 * http://localhost:PORT/api/patients
 * Get patients
 * [GET]
 */
patientRoutes.get("/api/patients", listPatients)

/**
 * [POST]
 * Create a patient
 */
patientRoutes.post("/api/patients", validatePostPatient, postPatient)

/**
 * [DELETE]
 * Delete a patient
 */
patientRoutes.delete("/api/patients/:id", validateDeletePatient, deletePatient)

export default patientRoutes