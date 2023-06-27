import { Request, Response } from "express"
import handleHttp from "../utils/error.handle"
import { insertPatient, getPatients } from "../services/patient"

const listPatients = async (req: Request, res: Response) => {
  try {
    const { limit, page } = req.query
    const response = await getPatients(limit?.toString(), page?.toString())
    res.send(response)
  } catch (error) {
    handleHttp(res, 'ERROR_GETTING_PATIENTS')
  }
}

const postPatient = async (req: Request, res: Response) => {
  try {
    const response = await insertPatient(req.body)
    res.send(response)
  } catch (error) {
    handleHttp(res, 'ERROR_POSTING_PATIENT', error)
  }
}

export { listPatients, postPatient }