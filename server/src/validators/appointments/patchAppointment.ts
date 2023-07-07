import { check, param } from "express-validator"
import validateResult from "../../utils/validate.handle"
import { NextFunction, Request, Response } from "express"
import { getPatientByCedula, getPatientByEmail, getPatientById } from "../../services/patient"
import { getDoctorById } from "../../services/doctor"
import { getAppointmentById } from "../../services/appointment"

const validatePatchAppointment = [
  param('id')
    .notEmpty().withMessage('El parámetro "id" no debe estar vacío')
    .isMongoId().withMessage('El parámetro "id" debe ser un ID de MongoDB válido')
    .custom(async (value) => {
      /**
       * Check if Appointment exists
       */
      const appointment = await getAppointmentById(value)
      if (!appointment) throw new Error('Appointment does not exist')
      else if (appointment.deleted_at) throw new Error('Appointment is deleted')
    }),

  check('patientId')
  .optional()
  .exists().withMessage('PatientId is required')
  .isMongoId().withMessage('PatientId must be a valid MongoId')
  .custom(async (value) => {
    /**
     * Check if patient exists
     */
    const patient = await getPatientById(value)
    if (!patient) throw new Error('Patient does not exist')
    else if (patient.deleted_at) throw new Error('Patient is deleted')
  }),

  check('doctorId')
    .optional()
    .exists().withMessage('DoctorId is required')
    .isMongoId().withMessage('DoctorId must be a valid MongoId')
    .custom(async (value) => {
      /**
       * Check if doctor exists
       */
      const doctor = await getDoctorById(value)
      if (!doctor) throw new Error('Doctor does not exist')
      else if (doctor.deleted_at) throw new Error('Doctor is deleted')
    }),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next)
  }
]

export { validatePatchAppointment }
