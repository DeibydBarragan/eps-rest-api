import { Request, Response } from "express"
import handleHttp from "../utils/error.handle"
import { getAllAppointments, insertAppointment } from "../services/appointment"

const listAllAppointments = async (req: Request, res: Response) => {
  try {
    const response = await getAllAppointments()
    res.send(response)
  } catch (error) {
    handleHttp(res, 'ERROR_GETTING_ALL_APPOINTMENTS', error)
  }
}

const postAppointment = async (req: Request, res: Response) => {
  try {
    const response = await insertAppointment(req.body)
    res.send(response)
  } catch (error) {
    handleHttp(res, 'ERROR_POSTING_APPOINTMENT')
  }
}

export { listAllAppointments, postAppointment }