import { type PopulatedDoc, type Document, type PaginateResult } from 'mongoose'
import {
  type AppointmentDocument,
  type Appointment
} from '../interfaces/appointment.interface'
import AppointmentModel from '../models/appointment'

// Get all appointments and paginate
const getAppointments = async (
  limit = '10',
  page = '1',
  speciality: null | string = null
): Promise<PaginateResult<Document>> => {
  const query = speciality
    ? { speciality, deleted_at: null }
    : { deleted_at: null }
  return await AppointmentModel.paginate(query, {
    sort: { date: 1 },
    limit: parseInt(limit),
    page: parseInt(page),
    populate: ['patient', 'doctor']
  })
}

// Get appointment by id
const getAppointmentById = async (
  id: string
): Promise<PopulatedDoc<Document>> => {
  return await AppointmentModel.findById(id).populate(['patient', 'doctor'])
}

// Get appointments by patient's id
const getAppointmentsByPatientId = async (
  id: string,
  limit = '10',
  page = '1'
): Promise<PaginateResult<Document>> => {
  return await AppointmentModel.paginate(
    {
      patient: id,
      deleted_at: null
    },
    {
      sort: { date: 1 },
      limit: parseInt(limit),
      page: parseInt(page),
      populate: ['patient', 'doctor']
    }
  )
}

// Get appointments by doctor's id
const getAppointmentsByDoctorId = async (
  id: string,
  limit = '10',
  page = '1'
): Promise<PaginateResult<Document>> => {
  return await AppointmentModel.paginate(
    {
      doctor: id,
      deleted_at: null
    },
    {
      sort: { date: 1 },
      limit: parseInt(limit),
      page: parseInt(page),
      populate: ['patient', 'doctor']
    }
  )
}

// Get all appointments by doctor's id
const getAllAppointmentsByDoctorId = async (
  id: string
): Promise<AppointmentDocument[]> => {
  return await AppointmentModel.find({
    doctor: id,
    deleted_at: null
  }).populate(['patient', 'doctor'])
}

// Get all appointments by patient's id
const getAllAppointmentsByPatientId = async (
  id: string
): Promise<AppointmentDocument[]> => {
  return await AppointmentModel.find({
    patient: id,
    deleted_at: null
  }).populate(['patient', 'doctor'])
}

// Insert appointment
const insertAppointment = async (
  appointment: Appointment
): Promise<Document> => {
  return await AppointmentModel.create(appointment)
}

// Update appointment
const putAppointmentService = async (
  id: string,
  appointment: Appointment
): Promise<Document | null> => {
  return await AppointmentModel.findByIdAndUpdate(id, appointment, {
    new: true
  })
}

// Delete appointment
const destroyAppointment = async (id: string): Promise<Document | null> => {
  return await AppointmentModel.findByIdAndUpdate(id, {
    deleted_at: new Date()
  })
}

export {
  insertAppointment,
  getAppointments,
  getAppointmentById,
  getAppointmentsByPatientId,
  getAppointmentsByDoctorId,
  getAllAppointmentsByDoctorId,
  getAllAppointmentsByPatientId,
  putAppointmentService,
  destroyAppointment
}
