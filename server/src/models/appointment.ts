import { Schema, model, SchemaTypes } from "mongoose"
import { Appointment } from "../interfaces/appointment.interface"

const AppointmentSchema = new Schema<Appointment>(
  {
    patientId: { type: SchemaTypes.ObjectId, required: true },
    doctorId: { type: SchemaTypes.ObjectId, required: true },
    speciality: { type: String, required: true }
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

const AppointmentModel = model('appointment', AppointmentSchema)
export default AppointmentModel