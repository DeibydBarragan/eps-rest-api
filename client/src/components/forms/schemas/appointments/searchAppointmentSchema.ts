import * as yup from 'yup'

export const searchAppointmentsSchema = yup.object().shape({
  cedula: yup
    .number()
    .typeError('La cedula es requerida')
    .min(1000000000, 'La cedula tiene que tener 10 caracteres')
    .max(9999999999, 'La cedula tiene que tener 10 caracteres'),  
})