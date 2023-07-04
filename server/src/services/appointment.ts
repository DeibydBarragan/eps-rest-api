import { Appointment } from "../interfaces/appointment.interface"
import AppointmentModel from "../models/appointment"

const insertAppointment = async (appointment: Appointment) => {
  return await AppointmentModel.create(appointment)
}

const getAppointments = async (limit:string = '10', page:string = '1') => {
  return await AppointmentModel.paginate({}, { limit: parseInt(limit), page: parseInt(page), populate: ['patient', 'doctor'] })
}

const getAppointmentsByPatientId = async (id: string, limit:string = '10', page:string = '1') => {
  return await AppointmentModel.paginate({ patient: id }, { limit: parseInt(limit), page: parseInt(page), populate: ['patient', 'doctor'] })
} 

const getAppointmentsByDoctorId = async (id: string, limit:string = '10', page:string = '1') => {
  return await AppointmentModel.paginate({ doctor: id }, { limit: parseInt(limit), page: parseInt(page), populate: ['patient', 'doctor'] })
} 

export { insertAppointment, getAppointments, getAppointmentsByPatientId, getAppointmentsByDoctorId }