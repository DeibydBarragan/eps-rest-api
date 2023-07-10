import { check, param } from 'express-validator'
import validateResult from '../../utils/validate.handle'
import { type NextFunction, type Request, type Response } from 'express'
import { getPatientById } from '../../services/patient'
import { getDoctorById } from '../../services/doctor'
import { getAppointmentById } from '../../services/appointment'
import {
  doctorIsAvailable,
  patientIsAvailable,
  validHour
} from '../../utils/dateValidations'

const validatePutAppointment = [
  param('id')
    .notEmpty()
    .withMessage('El parámetro "id" no debe estar vacío')
    .isMongoId()
    .withMessage('El parámetro "id" debe ser un ID de MongoDB válido')
    .custom(async (value) => {
      /**
       * Check if Appointment exists
       */
      const appointment = await getAppointmentById(value)
      if (appointment == null) throw new Error('Appointment does not exist')
      else if (appointment.deleted_at != null) {
        throw new Error('Appointment is deleted')
      }
      return true
    }),

  check('patientId')
    .exists()
    .withMessage('PatientId is required')
    .isMongoId()
    .withMessage('PatientId must be a valid MongoId')
    .custom(async (value) => {
      /**
       * Check if patient exists
       */
      const patient = await getPatientById(value)
      if (patient == null) throw new Error('Patient does not exist')
      else if (patient.deleted_at != null) throw new Error('Patient is deleted')
      return true
    }),

  check('doctorId')
    .exists()
    .withMessage('DoctorId is required')
    .isMongoId()
    .withMessage('DoctorId must be a valid MongoId')
    .custom(async (value) => {
      /**
       * Check if doctor exists
       */
      const doctor = await getDoctorById(value)
      if (doctor == null) throw new Error('Doctor does not exist')
      else if (doctor.deleted_at != null) throw new Error('Doctor is deleted')
      return true
    }),

  check('date')
    .exists()
    .withMessage('Date is required')
    .isDate()
    .withMessage('Date must be a valid date')
    .custom(
      async (value, { req }) =>
        await doctorIsAvailable(value, req.body.hour, req.body.doctorId)
    )
    .custom(
      async (value, { req }) =>
        await patientIsAvailable(value, req.body.hour, req.body.patientId)
    ),

  check('hour')
    .exists()
    .withMessage('Hour is required')
    .isString()
    .withMessage('Hour must be a string')
    .isLength({ min: 5, max: 5 })
    .withMessage('Time must be 5 characters long')
    .custom((value) => validHour(value)),

  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next)
  }
]

export { validatePutAppointment }
