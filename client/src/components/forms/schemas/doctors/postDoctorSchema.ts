import { specialities } from '@/constants/constants'
import * as yup from 'yup'

export const postDoctorSchema = yup.object().shape({
  name: yup
    .string()
    .required('El nombre es requerido')
    .min(3, 'El nombre tiene que tener al menos 3 caracteres'),
  lastname: yup
    .string()
    .required('El apellido es requerido')
    .min(3, 'El apellido tiene que tener al menos 3 caracteres'),
  cedula: yup
    .number()
    .typeError('La cedula es requerida')
    .min(1000000000, 'La cedula tiene que tener 10 caracteres')
    .max(9999999999, 'La cedula tiene que tener 10 caracteres'),
  speciality: yup
    .string()
    .required('La especialidad es requerida')
    .oneOf(specialities, 'La especialidad no es válida'),
  office: yup
    .string()
    .required('La oficina es requerida'),
  email: yup
    .string()
    .required('El email es requerido')
    .email('El email tiene que ser un email válido'),
  phone: yup
    .number()
    .typeError('El teléfono es requerido')
    .min(1000000000, 'El teléfono tiene que tener 10 caracteres')
    .max(9999999999, 'El teléfono tiene que tener 10 caracteres'),
  
})