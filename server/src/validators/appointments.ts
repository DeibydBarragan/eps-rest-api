import { check } from "express-validator"
import validateResult from "../utils/validate.handle"
import { NextFunction, Request, Response } from "express"
import { specialities } from "../constants/constants"
import { getDoctorById } from "../services/doctor"
import { getPatientById } from "../services/patient"

const validatePostAppointment = [
  check('patientId')
    .exists().withMessage('PatientId is required')
    .isString().withMessage('PatientId must be a string')
    .isMongoId().withMessage('PatientId must be a valid MongoId')
    .custom(async (value) => {
      /**
       * Check if patient exists
       */
      const patient = await getPatientById(value)
      if (!patient) return Promise.reject('Patient does not exist')
    }),
  check('doctorId')
    .exists().withMessage('DoctorId is required')
    .isString().withMessage('DoctorId must be a string')
    .isMongoId().withMessage('DoctorId must be a valid MongoId')
    .custom(async (value) => {
      /**
       * Check if doctor exists
       */
      const doctor = await getDoctorById(value)
      if (!doctor) return Promise.reject('Doctor does not exist')
    }),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next)
  }
]

export { validatePostAppointment }