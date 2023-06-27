import { Router } from "express"
import { listPatients, postPatient } from "../controllers/patient"
import { validatePostPatient } from "../validators/patients"

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

export default patientRoutes