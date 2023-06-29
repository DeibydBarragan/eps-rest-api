import mongoose, { Schema, SchemaTypes } from "mongoose"
import { Appointment } from "../interfaces/appointment.interface"
import paginate from 'mongoose-paginate-v2';

const AppointmentSchema = new Schema<Appointment>(
  {
    patientId: { type: SchemaTypes.ObjectId, required: true },
    doctorId: { type: SchemaTypes.ObjectId, required: true },
    speciality: { type: String, required: true },
    office: { type: String, required: true },
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