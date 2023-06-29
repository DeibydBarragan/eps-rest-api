import { Doctor } from "../interfaces/doctor.interface"
import DoctorModel from "../models/doctor"


const insertDoctor = async (doctor: Doctor) => {
  return await DoctorModel.create(doctor)
}

const getDoctors = async (limit:string = '10', page:string = '1') => {
  return await DoctorModel.paginate({}, { limit: parseInt(limit), page: parseInt(page) })
}

const getDoctorById = async (id: string) => {
  return await DoctorModel.findById(id)
}

export { insertDoctor, getDoctors, getDoctorById }