import { Router } from 'express'
import {
  deletePatient,
  listPatients,
  patchPatient,
  postPatient
} from '../controllers/patient'
import { validatePostPatient } from '../validators/patients/postPatient'
import { validateDeletePatient } from '../validators/patients/deletePatient'
import { validatePatchPatient } from '../validators/patients/patchPatient'

const patientRoutes = Router()

/**
 * http://localhost:PORT/api/patients
 * Get patients
 * [GET]
 */
patientRoutes.get('/api/patients', listPatients)

/**
 * [POST]
 * Create a patient
 */
patientRoutes.post('/api/patients', validatePostPatient, postPatient)

/**
 * [PATCH]
 * Create a patient
 */
patientRoutes.patch('/api/patients/:id', validatePatchPatient, patchPatient)

/**
 * [DELETE]
 * Delete a patient
 */
patientRoutes.delete('/api/patients/:id', validateDeletePatient, deletePatient)

export default patientRoutes
