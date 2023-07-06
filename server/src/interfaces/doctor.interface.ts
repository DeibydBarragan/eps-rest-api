export interface Doctor {
  name: string
  lastname: string
  cedula: number
  speciality: 'Medicina general' | 'Cardiología' | 'Medicina interna' | 'Dermatología' | 'Rehabilitación física' | 'Psicología' | 'Odontología' | 'Radiología'
  office: string
  email: string
  phone: number
  deleted_at?: Date
}