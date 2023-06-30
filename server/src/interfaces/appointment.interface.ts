import { Patient } from "./patient.interface"
import { Doctor } from "./doctor.interface"

export interface Appointment {
  patient: Patient
  doctor: Doctor
}