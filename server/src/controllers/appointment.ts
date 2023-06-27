import { Request, Response } from "express"
import handleHttp from "../utils/error.handle"
import { getAppointments, insertAppointment } from "../services/appointment"

const listAppointments = async (req: Request, res: Response) => {
  try {
    const { limit, page } = req.query
    const response = await getAppointments(limit?.toString(), page?.toString())
    res.send(response)
  } catch (error) {
    handleHttp(res, 'ERROR_GETTING_APPOINTMENTS', error)
  }
}

const postAppointment = async (req: Request, res: Response) => {
  try {
    const response = await insertAppointment(req.body)
    res.send(response)
  } catch (error) {
    handleHttp(res, 'ERROR_POSTING_APPOINTMENT', error)
  }
}

export { listAppointments, postAppointment }