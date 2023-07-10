import { type UpdateQuery, type Document, type PaginateResult } from 'mongoose'
import {
  type DoctorDocument,
  type Doctor
} from '../interfaces/doctor.interface'
import DoctorModel from '../models/doctor'
import { type Speciality } from '../types/types'

// Post
const insertDoctor = async (doctor: Doctor): Promise<Doctor> => {
  return await DoctorModel.create(doctor)
}

// Get and paginate
const paginateDoctors = async (
  limit = '10',
  page = '1'
): Promise<PaginateResult<Document>> => {
  return await DoctorModel.paginate(
    { deleted_at: null },
    { limit: parseInt(limit), page: parseInt(page) }
  )
}

// Get all without paginate
const getAllDoctors = async (): Promise<Doctor[]> => {
  return await DoctorModel.find({ deleted_at: null })
}

// Get all by speciality without paginate
const getAllDoctorsBySpeciality = async (
  speciality: Speciality
): Promise<Doctor[]> => {
  return await DoctorModel.find({ speciality, deleted_at: null })
}

// Get by id
const getDoctorById = async (id: string): Promise<DoctorDocument | null> => {
  return await DoctorModel.findById(id)
}

// Get by cedula
const getDoctorByCedula = async (
  cedula: number
): Promise<DoctorDocument | null> => {
  return await DoctorModel.findOne({ cedula, deleted_at: null })
}

// Get by email
const getDoctorByEmail = async (
  email: string
): Promise<DoctorDocument | null> => {
  return await DoctorModel.findOne({ email, deleted_at: null })
}

// Update
const updateDoctor = async (
  _id: string,
  doctor: Doctor
): Promise<UpdateQuery<Document>> => {
  return await DoctorModel.updateOne({ _id }, doctor)
}

// Delete
const destroyDoctor = async (
  id: string
): Promise<UpdateQuery<Document> | null> => {
  return await DoctorModel.findByIdAndUpdate(id, { deleted_at: new Date() })
}

export {
  insertDoctor,
  paginateDoctors,
  getAllDoctors,
  getAllDoctorsBySpeciality,
  getDoctorById,
  getDoctorByCedula,
  getDoctorByEmail,
  updateDoctor,
  destroyDoctor
}
