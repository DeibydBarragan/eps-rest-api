import mongoose, { Schema } from 'mongoose'
import { type Doctor } from '../interfaces/doctor.interface'
import paginate from 'mongoose-paginate-v2'

const DoctorSchema = new Schema<Doctor>(
  {
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    cedula: { type: Number, required: true },
    speciality: { type: String, required: true },
    office: { type: Number, required: true },
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
DoctorSchema.plugin(paginate)

// declare a mongoose document based on a Typescript interface representing your schema
interface DoctorDocument extends mongoose.Document, Doctor {}

// create the paginated model
const DoctorModel = mongoose.model<
  DoctorDocument,
  mongoose.PaginateModel<DoctorDocument>
>('Doctor', DoctorSchema, 'doctors')

export default DoctorModel
