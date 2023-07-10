import { type Speciality } from '../types/types'

export interface Doctor {
  name: string
  lastname: string
  cedula: number
  speciality: Speciality
  office: number
  email: string
  phone: number
  deleted_at?: Date
}

export interface DoctorDocument extends Doctor {
  _id: string
  createdAt: Date
  updatedAt?: Date
}
