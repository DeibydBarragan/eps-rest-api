import { Router } from 'express'
import {
  deletePatient,
  listPatients,
  patchPatient,
  postPatient
} from '../controllers/patient.controller'
import { validatePostPatient } from '../validators/patients/postPatient.validator'
import { validateDeletePatient } from '../validators/patients/deletePatient.validator'
import { validatePatchPatient } from '../validators/patients/patchPatient.validator'

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
