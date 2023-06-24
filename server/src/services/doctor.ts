import { Doctor } from "../interfaces/doctor.interface"
import DoctorModel from "../models/doctor"


const insertDoctor = async (doctor: Doctor) => {
  return await DoctorModel.create(doctor)
}

const getAllDoctors = async () => {
  return await DoctorModel.find({})
}

export { insertDoctor, getAllDoctors }