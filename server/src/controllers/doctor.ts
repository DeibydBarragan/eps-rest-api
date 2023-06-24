import { Request, Response } from "express"
import handleHttp from "../utils/error.handle"
import { getAllDoctors, insertDoctor } from "../services/doctor"

const listAllDoctors = async (req: Request, res: Response) => {
  try {
    const response = await getAllDoctors()
    res.send(response)
  } catch (error) {
    handleHttp(res, 'ERROR_GETTING_ALL_DOCTORS')
  }
}

const postDoctor = async (req: Request, res: Response) => {
  try {
    const response = await insertDoctor(req.body)
    res.send(response)
  } catch (error) {
    handleHttp(res, 'ERROR_POSTING_DOCTOR', error)
  }
}

export { listAllDoctors, postDoctor }