import { Request, Response } from "express"
import handleHttp from "../utils/error.handle"
import { getAppointments, insertAppointment } from "../services/appointment"
import { getDoctorById } from "../services/doctor"
import { getPatientById } from "../services/patient"

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
    const doctor = await getDoctorById(req.body.doctorId)
    if (!doctor) {
      handleHttp(res, 'DOCTOR_NOT_FOUND')
      return
    }
    const patient = await getPatientById(req.body.patientId)
    if (!patient) {
      handleHttp(res, 'DOCTOR_NOT_FOUND')
      return
    }
    const response = await insertAppointment({
      doctor,
      patient
    })
    res.send(response)
  } catch (error) {
    handleHttp(res, 'ERROR_POSTING_APPOINTMENT', error)
  }
}

export { listAppointments, postAppointment }