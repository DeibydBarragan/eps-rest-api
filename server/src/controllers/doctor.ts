import { Request, Response } from "express"
import handleHttp from "../utils/error.handle"
import { paginateDoctors, getAllDoctors, getAllDoctorsBySpeciality, insertDoctor } from "../services/doctor"
import { Speciality } from "../types/types"


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
      const response = await getAllDoctorsBySpeciality(speciality as Speciality)
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

export { listDoctors, allDoctors, postDoctor }