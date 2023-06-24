import { Appointment } from "../interfaces/appointment.interface"
import AppointmentModel from "../models/appointment"

const insertAppointment = async (appointment: Appointment) => {
  return await AppointmentModel.create(appointment)
}

const getAllAppointments = async () => {
  return await AppointmentModel.find({})
}

export { insertAppointment, getAllAppointments }