import { check } from "express-validator"
import validateResult from "../../utils/validate.handle"
import { NextFunction, Request, Response } from "express"
import { getDoctorById } from "../../services/doctor"
import { getPatientById } from "../../services/patient"

const validatePostAppointment = [
  check('patientId')
    .exists().withMessage('PatientId is required')
    .isMongoId().withMessage('PatientId must be a valid MongoId')
    .custom(async (value) => {
      /**
       * Check if patient exists
       */
      const patient = await getPatientById(value)
      if (!patient) throw new Error('Patient does not exist')
    }),
  check('doctorId')
    .exists().withMessage('DoctorId is required')
    .isMongoId().withMessage('DoctorId must be a valid MongoId')
    .custom(async (value) => {
      /**
       * Check if doctor exists
       */
      const doctor = await getDoctorById(value)
      if (!doctor) throw new Error('Doctor does not exist')
    }),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next)
  }
]

export { validatePostAppointment }