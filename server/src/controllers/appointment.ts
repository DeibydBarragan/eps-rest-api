import { Request, Response } from "express"
import handleHttp from "../utils/error.handle"
import { getAppointmentsByPatientId, getAppointments, insertAppointment, getAppointmentsByDoctorId, destroyAppointment } from "../services/appointment"
import { getDoctorByCedula, getDoctorById } from "../services/doctor"
import { getPatientByCedula, getPatientById } from "../services/patient"
import { specialities } from "../constants/constants"

const listAppointments = async (req: Request, res: Response) => {
  try {
    const { speciality, limit, page } = req.query
    const specialityValue = specialities[parseInt(speciality as string)]
    const response = await getAppointments(limit?.toString(), page?.toString(), specialityValue)
    res.send(response)
  } catch (error) {
    handleHttp(res, 'ERROR_GETTING_APPOINTMENTS', error)
  }
}

const deleteAppointment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const response = await destroyAppointment(id)
    res.send(response)
  } catch (error) {
    handleHttp(res, 'ERROR_DELETING_APPOINTMENT', error)
  }
}

const searchAppointmentsByPatientCedula = async (req: Request, res: Response) => {
  try {
    const { limit, page } = req.query
    const { cedula } = req.params
    const patient = await getPatientByCedula(parseInt(cedula))
    if (!patient) {
      handleHttp(res, 'PATIENT_NOT_FOUND')
      return
    }
    const response = await getAppointmentsByPatientId(patient._id, limit?.toString(), page?.toString())
    res.send(response)
  } catch (error) {
    handleHttp(res, 'ERROR_GETTING_APPOINTMENT', error)
  }
}

const searchAppointmentsByDoctorCedula = async (req: Request, res: Response) => {
  try {
    const { limit, page } = req.query
    const { cedula } = req.params
    const doctor = await getDoctorByCedula(parseInt(cedula))
    if (!doctor) {
      handleHttp(res, 'DOCTOR_NOT_FOUND')
      return
    }
    const response = await getAppointmentsByDoctorId(doctor._id, limit?.toString(), page?.toString())
    res.send(response)
  } catch (error) {
    handleHttp(res, 'ERROR_GETTING_APPOINTMENT', error)
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
      handleHttp(res, 'PATIENT_NOT_FOUND')
      return
    }
    const response = await insertAppointment({
      doctor: req.body.doctorId,
      patient: req.body.patientId,
      speciality: doctor.speciality,
      office: doctor.office
    })
    res.send(response)
  } catch (error) {
    handleHttp(res, 'ERROR_POSTING_APPOINTMENT', error)
  }
}

export { listAppointments, 
  postAppointment, 
  searchAppointmentsByPatientCedula, 
  searchAppointmentsByDoctorCedula,
  deleteAppointment
}