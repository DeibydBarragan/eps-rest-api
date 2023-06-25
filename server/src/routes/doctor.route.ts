import { Request, Response, Router } from "express"
import { listAllDoctors, postDoctor } from "../controllers/doctor"
import { validatePostDoctor } from "../validators/doctors"

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
doctorRoutes.post("/api/doctors", validatePostDoctor, postDoctor)

export default doctorRoutes