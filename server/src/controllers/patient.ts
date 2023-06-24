import { Request, Response } from "express"
import handleHttp from "../utils/error.handle"
import { insertPatient, getAllPatients } from "../services/patient"

const listAllPatients = async (req: Request, res: Response) => {
  try {
    const response = await getAllPatients()
    res.send(response)
  } catch (error) {
    handleHttp(res, 'ERROR_GETTING_ALL_PATIENTS')
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

export { listAllPatients, postPatient }