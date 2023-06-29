import { Types } from "mongoose"

export interface Appointment {
  patientId: Types.ObjectId
  doctorId: Types.ObjectId
  speciality: 'Medicina general' | 'Cardiología' | 'Medicina interna' | 'Dermatología' | 'Rehabilitación física' | 'Psicología' | 'Odontología' | 'Radiología'
  office: string
}