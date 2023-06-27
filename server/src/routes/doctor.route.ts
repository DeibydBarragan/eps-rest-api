import { Request, Response, Router } from "express"
import { listDoctors, postDoctor } from "../controllers/doctor"
import { validatePostDoctor } from "../validators/doctors"

const doctorRoutes = Router()

/**
 * http://localhost:PORT/api/doctors
 * Get doctors
 * [GET]
 */
doctorRoutes.get("/api/doctors", listDoctors)

/**
 * [POST]
 * Create a doctor
 */
doctorRoutes.post("/api/doctors", validatePostDoctor, postDoctor)

export default doctorRoutes