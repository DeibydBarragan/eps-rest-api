import { check, param } from 'express-validator'
import validateResult from '../../utils/validate.handle'
import { type NextFunction, type Request, type Response } from 'express'
import {
  getPatientByCedula,
  getPatientByEmail,
  getPatientById
} from '../../services/patient.services'

const validatePatchPatient = [
  param('id')
    .notEmpty()
    .withMessage('El parámetro "id" no debe estar vacío')
    .isMongoId()
    .withMessage('El parámetro "id" debe ser un ID de MongoDB válido')
    .custom(async (value) => {
      /**
       * Check if patient exists
       */
      const patient = await getPatientById(value)
      if (patient == null) throw new Error('Patient does not exist')
      else if (patient.deleted_at != null) throw new Error('Patient is deleted')
    }),
  check('name')
    .optional()
    .isString()
    .withMessage('Name must be a string')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters long'),
  check('lastname')
    .optional()
    .isString()
    .withMessage('Lastname must be a string')
    .isLength({ min: 3 })
    .withMessage('Lastname must be at least 3 characters long'),
  check('cedula')
    .optional()
    .isInt()
    .withMessage('Cedula must be an integer')
    .isLength({ min: 1, max: 11 })
    .withMessage('Cedula must be 1 to 11 characters long')
    .custom(async (value, { req }) => {
      /**
       * Check is value is bigger than 0
       */
      if (value < 0) throw new Error('Cedula must be a valid cedula')
      /**
       * Check if cedula is already in use by another patient
       */
      const patient = await getPatientByCedula(value)
      if (
        patient != null &&
        req.params != null &&
        patient._id.toString() !== req.params.id
      ) {
        throw new Error('Cedula already in use')
      }
      return true
    }),
  check('age')
    .optional()
    .isInt()
    .withMessage('Age must be an integer')
    .isLength({ min: 1, max: 3 })
    .withMessage('Age must be 1 to 3 characters long')
    .custom((value) => {
      /**
       * Check if age is between 0 and 135
       */
      if (value < 0 || value > 135) {
        throw new Error('Age must be between 0 and 120')
      }
      return true
    }),
  check('email')
    .optional()
    .isEmail()
    .withMessage('Email must be a valid email')
    .custom(async (value, { req }) => {
      /**
       * Check if email is already in use by another patient
       */
      const patient = await getPatientByEmail(value)
      if (
        patient != null &&
        req.params != null &&
        patient._id.toString() !== req.params?.id
      ) {
        throw new Error('Email already in use')
      }
      return true
    }),
  check('phone')
    .optional()
    .isInt()
    .withMessage('Phone must be an integer')
    .custom((value) => {
      /**
       * Check is value is bigger than 0
       */
      if (value < 0) {
        throw new Error('Phone must be a valid phone')
      }
      return true
    })
    .isLength({ min: 10, max: 10 })
    .withMessage('Phone must be 10 characters long'),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next)
  }
]

export { validatePatchPatient }
