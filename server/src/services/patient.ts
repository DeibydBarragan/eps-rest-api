import { Patient } from "../interfaces/patient.interface";
import PatientModel from "../models/patient";

//Insert
const insertPatient = async (patient: Patient) => {
  return await PatientModel.create(patient)
}

//Get and paginate
const getPatients = async (limit:string = '10', page:string = '1') => {
  return await PatientModel.paginate({ deleted_at: null }, { limit: parseInt(limit), page: parseInt(page) })
}

//Get by id
const getPatientById = async (id: string) => {
  return await PatientModel.findById(id)
}

//Get by cedula
const getPatientByCedula = async (cedula: number) => {
  return await PatientModel.findOne({ cedula, deleted_at: null })
}

//Get by email
const getPatientByEmail = async (email: string) => {
  return await PatientModel.findOne({ email, deleted_at: null })
}

//Update
const updatePatient = async (_id: string, patient: Patient) => {
  return await PatientModel.updateOne({ _id }, patient)
}

//Delete
const destroyPatient = async (id: string) => {
  return await PatientModel.findByIdAndUpdate(id, { deleted_at: new Date() })
}

export { insertPatient, 
  getPatients, 
  getPatientById, 
  getPatientByCedula,
  updatePatient,
  destroyPatient,
  getPatientByEmail
}