import { Request, Response, Router } from "express"
import { listDoctors, allDoctors, postDoctor } from "../controllers/doctor"
import { validatePostDoctor } from "../validators/doctors"

const doctorRoutes = Router()

/**
 * http://localhost:PORT/api/doctors
 * Get doctors
 * [GET]
 */
doctorRoutes.get("/api/doctors", listDoctors)

/**
 * http://localhost:PORT/api/allDoctors
 * Get all doctors or get all doctors by speciality
 * [GET]
 */
doctorRoutes.get("/api/allDoctors", allDoctors)

/**
 * [POST]
 * Create a doctor
 */
doctorRoutes.post("/api/doctors", validatePostDoctor, postDoctor)

export default doctorRoutes