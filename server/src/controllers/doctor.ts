import { Request, Response } from "express"
import handleHttp from "../utils/error.handle"
import { getDoctors, insertDoctor } from "../services/doctor"

const listDoctors = async (req: Request, res: Response) => {
  try {
    const { limit, page } = req.query
    const response = await getDoctors(limit?.toString(), page?.toString())
    res.send(response)
  } catch (error) {
    handleHttp(res, 'ERROR_GETTING_DOCTORS')
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

export { listDoctors, postDoctor }