import { Router } from "express"
import { listAllPatients, postPatient } from "../controllers/patient"
import { validatePostPatient } from "../validators/patients"

const patientRoutes = Router()

/**
 * http://localhost:PORT/api/patients
 * Get all patients
 * [GET]
 */
patientRoutes.get("/api/patients", listAllPatients)

/**
 * [POST]
 * Create a patient
 */
patientRoutes.post("/api/patients", validatePostPatient, postPatient)

export default patientRoutes