import { Router } from "express"
import { listDoctors, allDoctors, postDoctor, deleteDoctor, patchDoctor } from "../controllers/doctor"
import { validatePostDoctor } from "../validators/doctors/postDoctors"
import { validateDeleteDoctor } from "../validators/doctors/deleteDoctor"
import { validatePatchDoctor } from "../validators/doctors/patchDoctor"

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
 * [PATCH]
 * Create a doctor
 */
doctorRoutes.patch("/api/doctors/:id", validatePatchDoctor, patchDoctor)

/**
 * [DELETE]
 * Delete a doctor
 */
doctorRoutes.delete("/api/doctors/:id", validateDeleteDoctor, deleteDoctor)

export default doctorRoutes