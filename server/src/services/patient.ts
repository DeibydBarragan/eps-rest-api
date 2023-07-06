import { Patient } from "../interfaces/patient.interface";
import PatientModel from "../models/patient";

const insertPatient = async (patient: Patient) => {
  return await PatientModel.create(patient)
}

const getPatients = async (limit:string = '10', page:string = '1') => {
  return await PatientModel.paginate({ deleted_at: null }, { limit: parseInt(limit), page: parseInt(page) })
}

const getPatientById = async (id: string) => {
  return await PatientModel.findById(id)
}

const getPatientByCedula = async (cedula: number) => {
  return await PatientModel.findOne({ cedula, deleted_at: null })
}

const destroyPatient = async (id: string) => {
  return await PatientModel.findByIdAndUpdate(id, { deleted_at: new Date() })
}

export { insertPatient, 
  getPatients, 
  getPatientById, 
  getPatientByCedula,
  destroyPatient
}