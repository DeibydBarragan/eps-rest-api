import { Types } from "mongoose"

export interface Appointment {
  patient: Types.ObjectId
  doctor: Types.ObjectId
  speciality: 'Medicina general' | 'Cardiología' | 'Medicina interna' | 'Dermatología' | 'Rehabilitación física' | 'Psicología' | 'Odontología' | 'Radiología'
  office: string
}