import { type PaginateResult, type Document, type UpdateQuery } from 'mongoose'
import {
  type PatientDocument,
  type Patient
} from '../interfaces/patient.interface'
import PatientModel from '../models/patient.model'

// Insert
const insertPatient = async (patient: Patient): Promise<Patient> => {
  return await PatientModel.create(patient)
}

// Get and paginate
const getPatients = async (
  limit = '10',
  page = '1'
): Promise<PaginateResult<Document>> => {
  return await PatientModel.paginate(
    { deleted_at: null },
    { limit: parseInt(limit), page: parseInt(page) }
  )
}

// Get by id
const getPatientById = async (id: string): Promise<PatientDocument | null> => {
  return await PatientModel.findById(id)
}

// Get by cedula
const getPatientByCedula = async (
  cedula: number
): Promise<PatientDocument | null> => {
  return await PatientModel.findOne({ cedula, deleted_at: null })
}

// Get by email
const getPatientByEmail = async (
  email: string
): Promise<PatientDocument | null> => {
  return await PatientModel.findOne({ email, deleted_at: null })
}

// Update
const updatePatient = async (
  _id: string,
  patient: Patient
): Promise<UpdateQuery<Document>> => {
  return await PatientModel.updateOne({ _id }, patient)
}

// Delete
const destroyPatient = async (
  id: string
): Promise<UpdateQuery<Document> | null> => {
  return await PatientModel.findByIdAndUpdate(id, { deleted_at: new Date() })
}

export {
  insertPatient,
  getPatients,
  getPatientById,
  getPatientByCedula,
  updatePatient,
  destroyPatient,
  getPatientByEmail
}
