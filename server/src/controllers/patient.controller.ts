import { type Request, type Response } from 'express'
import handleHttp from '../utils/error.handle'
import {
  insertPatient,
  getPatients,
  destroyPatient,
  updatePatient
} from '../services/patient.services'

/**
 * List and paginate a doctor in the database
 */
const listPatients = async (req: Request, res: Response): Promise<void> => {
  try {
    const { limit, page } = req.query
    const response = await getPatients(limit?.toString(), page?.toString())
    res.send(response)
  } catch (error) {
    handleHttp(res, 'ERROR_GETTING_PATIENTS')
  }
}

/**
 * Create a patient in the database
 */
const postPatient = async (req: Request, res: Response): Promise<void> => {
  try {
    const response = await insertPatient(req.body)
    res.send(response)
  } catch (error) {
    handleHttp(res, 'ERROR_POSTING_PATIENT', error)
  }
}

/**
 * Update a pateint in the database
 */
const patchPatient = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const response = await updatePatient(id, req.body)
    res.send(response)
  } catch (error) {
    handleHttp(res, 'ERROR_UPDATING_PATIENT', error)
  }
}

/**
 * Delete a patient in the database
 */
const deletePatient = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const response = await destroyPatient(id)
    res.send(response)
  } catch (error) {
    handleHttp(res, 'ERROR_DELETING_PATIENT', error)
  }
}

export { listPatients, postPatient, patchPatient, deletePatient }
