import { check, param } from 'express-validator'
import {
  getDoctorByCedula,
  getDoctorByEmail,
  getDoctorById
} from '../../services/doctor.services'
import { type NextFunction, type Request, type Response } from 'express'
import validateResult from '../../utils/validate.handle'
import { specialities } from '../../constants/constants'

const validatePatchDoctor = [
  param('id')
    .notEmpty()
    .withMessage('El parámetro "id" no debe estar vacío')
    .isMongoId()
    .withMessage('El parámetro "id" debe ser un ID de MongoDB válido')
    .custom(async (value) => {
      /**
       * Check if doctor exists
       */
      const doctor = await getDoctorById(value)
      if (doctor == null) throw new Error('Doctor does not exist')
      else if (doctor.deleted_at != null) throw new Error('Doctor is deleted')
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
      if (value < 0) {
        throw new Error('Cedula must be a valid cedula')
      }
      /**
       * Check if cedula is already in use by another doctor
       */
      const doctor = await getDoctorByCedula(value)
      if (
        doctor != null &&
        req.params != null &&
        doctor._id?.toString() !== req.params?.id
      ) {
        throw new Error('Cedula already in use')
      }
    }),
  check('speciality')
    .optional()
    .exists()
    .withMessage('Speciality is required')
    .isString()
    .withMessage('Speciality must be a string')
    .isIn(specialities)
    .withMessage(
      `Speciality must be one of these values: ${specialities.join(', ')}`
    ),
  check('office')
    .optional()
    .exists()
    .withMessage('Office is required')
    .isInt()
    .withMessage('Office must be an integer')
    .custom((value) => {
      /**
       * Check is value is bigger than 0
       * Check if office is between 100 and 999
       */
      if (value < 100 || value > 999) {
        throw new Error('Office must be between 100 and 999')
      }
      return true
    }),
  check('email')
    .optional()
    .isEmail()
    .withMessage('Email must be a valid email')
    .custom(async (value, { req }) => {
      /**
       * Check if email is already in use by another doctor
       */
      const doctor = await getDoctorByEmail(value)
      if (
        doctor != null &&
        req.params != null &&
        doctor._id?.toString() !== req.params.id
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

export { validatePatchDoctor }
