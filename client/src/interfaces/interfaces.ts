export interface Patient  {
  _id: string
  name: string
  lastname: string
  cedula: number
  age: number
  email: string
  phone: number
}

export interface Doctor {
  _id: string
  name: string
  lastname: string
  cedula: number
  speciality: Speciality
  office: string
  email: string
  phone: number
}

export interface Appointment {
  patientId: string
  doctorId: string
  date: string
  hour: string
}

export type Speciality = 'Medicina general' | 'Cardiología' | 'Medicina interna' | 'Dermatología' | 'Rehabilitación física' | 'Psicología' | 'Odontología' | 'Radiología'

export interface Pagination {
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}