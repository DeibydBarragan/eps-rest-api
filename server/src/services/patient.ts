import { Patient } from "../interfaces/patient.interface";
import PatientModel from "../models/patient";

const insertPatient = async (patient: Patient) => {
  return await PatientModel.create(patient)
}

const getPatients = async (limit:string = '10', page:string = '1') => {
  return await PatientModel.paginate({}, { limit: parseInt(limit), page: parseInt(page) })
}

const getPatientById = async (id: string) => {
  return await PatientModel.findById(id)
}

export { insertPatient, getPatients, getPatientById }