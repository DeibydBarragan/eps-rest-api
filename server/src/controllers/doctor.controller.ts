import { type Request, type Response } from 'express'
import handleHttp from '../utils/error.handle'
import {
  paginateDoctors,
  getAllDoctors,
  getAllDoctorsBySpeciality,
  insertDoctor,
  destroyDoctor,
  updateDoctor
} from '../services/doctor.services'
import { specialities } from '../constants/constants'

/**
 * list and paginate doctors
 */
const listDoctors = async (req: Request, res: Response): Promise<void> => {
  try {
    const { limit, page } = req.query

    const response = await paginateDoctors(limit?.toString(), page?.toString())
    res.send(response)
  } catch (error) {
    handleHttp(res, 'ERROR_GETTING_DOCTORS')
  }
}

/**
 * get all doctors
 * or get all doctors by speciality
 */
const allDoctors = async (req: Request, res: Response): Promise<void> => {
  try {
    if (req.query.speciality) {
      const selectedSpeciality =
        specialities[parseInt(JSON.stringify(req.query.speciality).toString())]
      const response = await getAllDoctorsBySpeciality(selectedSpeciality)
      res.send(response)
    }

    const response = await getAllDoctors()
    res.send(response)
  } catch (error) {
    handleHttp(res, 'ERROR_GETTING_DOCTORS')
  }
}

/**
 * Create a doctor in the database
 */
const postDoctor = async (req: Request, res: Response): Promise<void> => {
  try {
    const response = await insertDoctor(req.body)
    res.send(response)
  } catch (error) {
    handleHttp(res, 'ERROR_POSTING_DOCTOR', error)
  }
}

/**
 * Update a doctor in the database
 */
const patchDoctor = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const response = await updateDoctor(id, req.body)
    res.send(response)
  } catch (error) {
    handleHttp(res, 'ERROR_UPDATING_DOCTOR', error)
  }
}

/**
 * Delete a doctor in the database
 */
const deleteDoctor = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const response = await destroyDoctor(id)
    res.send(response)
  } catch (error) {
    handleHttp(res, 'ERROR_DELETING_DOCTOR', error)
  }
}

export { listDoctors, allDoctors, postDoctor, patchDoctor, deleteDoctor }
