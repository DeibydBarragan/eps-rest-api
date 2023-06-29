export interface Patient  {
  _id: number
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
  speciality: 'Medicina general' | 'Cardiología' | 'Medicina interna' | 'Dermatología' | 'Rehabilitación física' | 'Psicología' | 'Odontología' | 'Radiología'
  office: string
  email: string
  phone: number
}

export interface Appointment {
  _id: string
  patientId: string
  doctorId: string
  speciality: 'Medicina general' | 'Cardiología' | 'Medicina interna' | 'Dermatología' | 'Rehabilitación física' | 'Psicología' | 'Odontología' | 'Radiología'
  office: string
}

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