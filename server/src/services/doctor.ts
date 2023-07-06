import { Doctor } from "../interfaces/doctor.interface"
import DoctorModel from "../models/doctor"
import { Speciality } from "../types/types"

const insertDoctor = async (doctor: Doctor) => {
  return await DoctorModel.create(doctor)
}

const paginateDoctors = async (limit:string = '10', page:string = '1') => {
  return await DoctorModel.paginate({ deleted_at: null }, { limit: parseInt(limit), page: parseInt(page) })
}

const getAllDoctors = async () => {
  return await DoctorModel.find({ deleted_at: null })
}

const getAllDoctorsBySpeciality = async (speciality: Speciality) => {
  return await DoctorModel.find({ speciality, deleted_at: null })
}

const getDoctorById = async (id: string) => {
  return await DoctorModel.findById(id)
}

const getDoctorByCedula = async (cedula: number) => {
  return await DoctorModel.findOne({ cedula, deleted_at: null })
}

const destroyDoctor = async (id: string) => {
  return await DoctorModel.findByIdAndUpdate(id, { deleted_at: new Date() })
}

export { insertDoctor, 
  paginateDoctors, 
  getAllDoctors, 
  getAllDoctorsBySpeciality, 
  getDoctorById, 
  getDoctorByCedula,
  destroyDoctor
}