import { Doctor } from "../interfaces/doctor.interface"
import DoctorModel from "../models/doctor"


const insertDoctor = async (doctor: Doctor) => {
  return await DoctorModel.create(doctor)
}

const getAllDoctors = async () => {
  return await DoctorModel.find({})
}

const getDoctorById = async (id: string) => {
  return await DoctorModel.findById(id)
}

export { insertDoctor, getAllDoctors, getDoctorById }