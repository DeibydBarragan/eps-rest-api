import { specialities } from '@/constants/constants'
import * as yup from 'yup'

export const patchDoctorSchema = yup.object().shape({
  name: yup
    .string()
    .test('minimum-length', 'El nombre tiene que tener mínimo 3 carácteres', (value) => {
      if (!value) return true
      return value.length >= 3
    }),
  lastname: yup
    .string()
    .test('minimum-length', 'El apellido tiene que tener mínimo 3 carácteres', (value) => {
      if (!value) return true
      return value.length >= 3
    }),
  cedula: yup
    .string()
    .test('length', 'La cédula tiene que tener 10 carácteres', (value) => {
      if (!value) return true
      return value.length === 10 && parseInt(value) >= 0
    }),
  speciality: yup
    .string()
    .optional(),
  office: yup
    .string()
    .test('length', 'El consultorio debe estar entre 100 y 999', (value) => {
      if (!value) return true
      return value.length === 3 && parseInt(value) >= 100
    }),
  email: yup
    .string()
    .email('El email tiene que ser un email válido')
    .optional(),
  phone: yup
    .string()
    .test('length', 'El número debe tener 10 dígitos', (value) => {
      if (!value) return true
      return value.length === 10 && parseInt(value) >= 0
    }),
})