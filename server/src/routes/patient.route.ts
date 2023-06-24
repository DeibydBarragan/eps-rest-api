import { Router } from "express"
import { listAllPatients, postPatient } from "../controllers/patient"

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
patientRoutes.post("/api/patients", postPatient)

export default patientRoutes