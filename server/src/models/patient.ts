import mongoose, { Schema } from 'mongoose'
import { type Patient } from '../interfaces/patient.interface'
import paginate from 'mongoose-paginate-v2'

const PatientSchema = new Schema<Patient>(
  {
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    cedula: { type: Number, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    deleted_at: { type: Date, default: null }
  },
  {
    timestamps: true,
    versionKey: false
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
>('Patient', PatientSchema, 'patients')

export default PatientModel
