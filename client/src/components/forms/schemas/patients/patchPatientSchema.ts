import * as yup from 'yup'

export const patchPatientSchema = yup.object().shape({
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
  age: yup
    .string()
    .test('length', 'La edad tiene que ser un valor entre 0 y 135', (value) => {
      if (!value) return true
      return value.length >= 0 && parseInt(value) >= 0 && parseInt(value) <= 135
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