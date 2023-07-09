import { Request, Response } from "express"
import handleHttp from "../utils/error.handle"
import { paginateDoctors, getAllDoctors, getAllDoctorsBySpeciality, insertDoctor, destroyDoctor, updateDoctor } from "../services/doctor"
import { Speciality } from "../types/types"
import { specialities } from "../constants/constants"


/**
 * list and paginate doctors
 */
const listDoctors = async (req: Request, res: Response) => {
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
const allDoctors = async (req: Request, res: Response) => {
  try {
    const { speciality } = req.query

    if (speciality) {
      const selectedSpeciality = specialities[parseInt(speciality.toString())]
      const response = await getAllDoctorsBySpeciality(selectedSpeciality)
      return res.send(response)
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
const postDoctor = async (req: Request, res: Response) => {
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
const patchDoctor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const response = await updateDoctor( id, req.body)
    res.send(response)
  } catch (error) {
    handleHttp(res, 'ERROR_UPDATING_DOCTOR', error)
  }
}

/**
 * Delete a doctor in the database
 */
const deleteDoctor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const response = await destroyDoctor(id)
    res.send(response)
  } catch (error) {
    handleHttp(res, 'ERROR_DELETING_DOCTOR', error)
  }
}

export { listDoctors, 
  allDoctors, 
  postDoctor,
  patchDoctor,
  deleteDoctor
}