import { Doctor } from "../interfaces/doctor.interface"
import DoctorModel from "../models/doctor"
import { Speciality } from "../types/types"


const insertDoctor = async (doctor: Doctor) => {
  return await DoctorModel.create(doctor)
}

const paginateDoctors = async (limit:string = '10', page:string = '1') => {
  return await DoctorModel.paginate({}, { limit: parseInt(limit), page: parseInt(page) })
}

const getAllDoctors = async () => {
  return await DoctorModel.find({})
}

const getAllDoctorsBySpeciality = async (speciality: Speciality) => {
  return await DoctorModel.find({ speciality })
}

const getDoctorById = async (id: string) => {
  return await DoctorModel.findById(id)
}

export { insertDoctor, paginateDoctors, getAllDoctors, getAllDoctorsBySpeciality, getDoctorById }