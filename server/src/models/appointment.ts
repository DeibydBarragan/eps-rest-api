import mongoose, { Schema, SchemaTypes } from "mongoose"
import { Appointment } from "../interfaces/appointment.interface"
import paginate from 'mongoose-paginate-v2';

const AppointmentSchema = new Schema<Appointment>(
  {
    patient: { type: SchemaTypes.ObjectId, required: true, ref: 'Patient' },
    doctor: { type: SchemaTypes.ObjectId, required: true, ref: 'Doctor' },
    speciality: { type: String, required: true },
    date: { type: Date, required: true },
    office: { type: Number, required: true },
    deleted_at: { type: Date, default: null },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

// add mongoose paginate to the schema
AppointmentSchema.plugin(paginate)

// declare a mongoose document based on a Typescript interface representing your schema
interface AppointmentDocument extends mongoose.Document, Appointment {}

// create the paginated model
const AppointmentModel = mongoose.model<
  AppointmentDocument,
  mongoose.PaginateModel<AppointmentDocument>
>('appointment', AppointmentSchema, 'appointments');

export default AppointmentModel