import { type Types } from 'mongoose'
import { type Speciality } from '../types/types'

export interface Appointment {
  patient: Types.ObjectId
  doctor: Types.ObjectId
  speciality: Speciality
  office: number
  date: Date
  deleted_at?: Date
}

export interface AppointmentDocument extends Appointment {
  _id: string
  createdAt: Date
  updatedAt: Date
}
