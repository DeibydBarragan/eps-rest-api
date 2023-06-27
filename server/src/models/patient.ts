import { Schema } from "mongoose"
import { Patient } from "../interfaces/patient.interface"
import paginate from 'mongoose-paginate-v2'
import mongoose from "mongoose"

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

// add mongoose paginate to the schema
PatientSchema.plugin(paginate)

// declare a mongoose document based on a Typescript interface representing your schema
interface PatientDocument extends mongoose.Document, Patient {}

// create the paginated model
const PatientModel = mongoose.model<
  PatientDocument,
  mongoose.PaginateModel<PatientDocument>
>('patient', PatientSchema, 'patients');

export default PatientModel