import { Request, Response, Router } from "express"
import { listAllDoctors, postDoctor } from "../controllers/doctor"

const doctorRoutes = Router()

/**
 * http://localhost:PORT/api/doctors
 * Get all doctors
 * [GET]
 */
doctorRoutes.get("/api/doctors", listAllDoctors)

/**
 * [POST]
 * Create a doctor
 */
doctorRoutes.post("/api/doctors", postDoctor)

export default doctorRoutes