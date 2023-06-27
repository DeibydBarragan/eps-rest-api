import { Appointment } from "../interfaces/appointment.interface"
import AppointmentModel from "../models/appointment"

const insertAppointment = async (appointment: Appointment) => {
  return await AppointmentModel.create(appointment)
}

const getAppointments = async (limit:string = '10', page:string = '10') => {
  return await AppointmentModel.paginate({}, { limit: parseInt(limit), page: parseInt(page) })
}

export { insertAppointment, getAppointments }