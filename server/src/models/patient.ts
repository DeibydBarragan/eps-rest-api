import { Schema, model } from "mongoose"
import { Patient } from "../interfaces/patient.interface"

const PatientSchema = new Schema<Patient>(
  {
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    cedula: { type: Number, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

const PatientModel = model('patient', PatientSchema)
export default PatientModel