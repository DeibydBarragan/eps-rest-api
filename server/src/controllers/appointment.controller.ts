import { type Request, type Response } from 'express'
import handleHttp from '../utils/error.handle'
import {
  getAppointmentsByPatientId,
  getAppointments,
  insertAppointment,
  getAppointmentsByDoctorId,
  destroyAppointment,
  putAppointmentService
} from '../services/appointment.services'
import { getDoctorByCedula, getDoctorById } from '../services/doctor.services'
import { getPatientByCedula, getPatientById } from '../services/patient.services'
import { specialities } from '../constants/constants'
import moment from 'moment'

// Create an appointment
const postAppointment = async (req: Request, res: Response): Promise<void> => {
  try {
    const doctor = await getDoctorById(req.body.doctorId)
    if (doctor == null) {
      handleHttp(res, 'DOCTOR_NOT_FOUND')
      return
    }
    const patient = await getPatientById(req.body.patientId)
    if (patient == null) {
      handleHttp(res, 'PATIENT_NOT_FOUND')
      return
    }

    const date = moment(
      `${req.body.date as string} ${req.body.hour as string}`,
      'YYYY-MM-DD HH:mm'
    ).toDate()
    const response = await insertAppointment({
      doctor: req.body.doctorId,
      patient: req.body.patientId,
      speciality: doctor.speciality,
      office: doctor.office,
      date
    })
    res.send(response)
  } catch (error) {
    handleHttp(res, 'ERROR_POSTING_APPOINTMENT', error)
  }
}

// List all appointments
const listAppointments = async (req: Request, res: Response): Promise<void> => {
  try {
    const { speciality, limit, page } = req.query
    const specialityValue = specialities[parseInt(speciality as string)]
    const response = await getAppointments(
      limit?.toString(),
      page?.toString(),
      specialityValue
    )
    res.send(response)
  } catch (error) {
    handleHttp(res, 'ERROR_GETTING_APPOINTMENTS', error)
  }
}

// Search appointments by patient cedula
const searchAppointmentsByPatientCedula = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { limit, page } = req.query
    const { cedula } = req.params
    const patient = await getPatientByCedula(parseInt(cedula))
    if (patient == null) {
      handleHttp(res, 'PATIENT_NOT_FOUND')
      return
    }
    const response = await getAppointmentsByPatientId(
      patient._id,
      limit?.toString(),
      page?.toString()
    )
    res.send(response)
  } catch (error) {
    handleHttp(res, 'ERROR_GETTING_APPOINTMENT', error)
  }
}

// Search appointments by doctor cedula
const searchAppointmentsByDoctorCedula = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { limit, page } = req.query
    const { cedula } = req.params
    const doctor = await getDoctorByCedula(parseInt(cedula))
    if (doctor == null) {
      handleHttp(res, 'DOCTOR_NOT_FOUND')
      return
    }
    const response = await getAppointmentsByDoctorId(
      doctor._id,
      limit?.toString(),
      page?.toString()
    )
    res.send(response)
  } catch (error) {
    handleHttp(res, 'ERROR_GETTING_APPOINTMENT', error)
  }
}

// Patch an appointment
const putAppointment = async (req: Request, res: Response): Promise<void> => {
  try {
    const doctor = await getDoctorById(req.body.doctorId)
    if (doctor == null) {
      handleHttp(res, 'DOCTOR_NOT_FOUND')
      return
    }
    const patient = await getPatientById(req.body.patientId)
    if (patient == null) {
      handleHttp(res, 'PATIENT_NOT_FOUND')
      return
    }

    const { id } = req.params
    const date = moment(
      `${req.body.date as string} ${req.body.hour as string}`,
      'YYYY-MM-DD HH:mm'
    ).toDate()

    const response = await putAppointmentService(id, {
      doctor: req.body.doctorId,
      patient: req.body.patientId,
      speciality: doctor.speciality,
      office: doctor.office,
      date
    })
    res.send(response)
  } catch (error) {
    handleHttp(res, 'ERROR_UPDATING_APPOINTMENT', error)
  }
}

// Delete an appointment
const deleteAppointment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params
    const response = await destroyAppointment(id)
    res.send(response)
  } catch (error) {
    handleHttp(res, 'ERROR_DELETING_APPOINTMENT', error)
  }
}

export {
  listAppointments,
  postAppointment,
  searchAppointmentsByPatientCedula,
  searchAppointmentsByDoctorCedula,
  putAppointment,
  deleteAppointment
}
