import { Patient } from "../interfaces/patient.interface";
import PatientModel from "../models/patient";

const insertPatient = async (patient: Patient) => {
  return await PatientModel.create(patient)
}

const getAllPatients = async () => {
  return await PatientModel.find({})
}

export { insertPatient, getAllPatients }