import { Router } from "express"
import { listDoctors, allDoctors, postDoctor, deleteDoctor } from "../controllers/doctor"
import { validatePostDoctor } from "../validators/doctors/doctors"
import { validateDeleteDoctor } from "../validators/doctors/deleteDoctor"

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

/**
 * [DELETE]
 * Delete a doctor
 */
doctorRoutes.delete("/api/doctors/:id", validateDeleteDoctor, deleteDoctor)

export default doctorRoutes