import { Appointment } from "../interfaces/appointment.interface"
import AppointmentModel from "../models/appointment"

const getAppointments = async (limit:string = '10', page:string = '1', speciality:null | string = null) => {
  const query = speciality ? { speciality, deleted_at: null } : { deleted_at: null }
  return await AppointmentModel.paginate(query, { 
    limit: parseInt(limit), 
    page: parseInt(page), 
    populate: ['patient', 'doctor'] 
  })
}

const getAppointmentById = async (id: string) => {
  return await AppointmentModel.findById(id).populate(['patient', 'doctor'])
}

const getAppointmentsByPatientId = async (id: string, limit:string = '10', page:string = '1') => {
  return await AppointmentModel.paginate({
    patient: id, 
    deleted_at: null 
  }, { 
    limit: parseInt(limit), 
    page: parseInt(page), 
    populate: ['patient', 'doctor'] 
  })
} 

const getAppointmentsByDoctorId = async (id: string, limit:string = '10', page:string = '1') => {
  return await AppointmentModel.paginate({ 
    doctor: id,
    deleted_at: null 
  }, { 
    limit: parseInt(limit), 
    page: parseInt(page), 
    populate: ['patient', 'doctor'] 
  })
}

const insertAppointment = async (appointment: Appointment) => {
  return await AppointmentModel.create(appointment)
}

const destroyAppointment = async (id: string) => {
  return await AppointmentModel.findByIdAndUpdate(id, { deleted_at: new Date() })
}

export { insertAppointment, 
  getAppointments, 
  getAppointmentById, 
  getAppointmentsByPatientId, 
  getAppointmentsByDoctorId, 
  destroyAppointment 
}