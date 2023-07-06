export interface Patient {
  name: string
  lastname: string
  cedula: number
  age: number
  email: string
  phone: number
  deleted_at?: Date
}