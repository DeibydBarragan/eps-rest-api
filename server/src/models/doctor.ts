import { Schema, model } from "mongoose"
import { Doctor } from "../interfaces/doctor.interface"

const DoctorSchema = new Schema<Doctor>(
  {
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    speciality: { type: String, required: true },
    office: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true }
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

const DoctorModel = model('doctor', DoctorSchema)
export default DoctorModel