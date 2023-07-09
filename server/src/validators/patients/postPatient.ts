import { check } from "express-validator"
import validateResult from "../../utils/validate.handle"
import { NextFunction, Request, Response } from "express"
import { getPatientByCedula, getPatientByEmail } from "../../services/patient"


const validatePostPatient = [
  check('name')
    .exists().withMessage('Name is required')
    .isString().withMessage('Name must be a string')
    .isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
  check('lastname')
    .exists().withMessage('Lastname is required')
    .isString().withMessage('Lastname must be a string')
    .isLength({ min: 3 }).withMessage('Lastname must be at least 3 characters long'),
  check('cedula')
    .exists().withMessage('Cedula is required')
    .isInt().withMessage('Cedula must be an integer')
    .isLength({ min: 1, max: 11 }).withMessage('Cedula must be 1 to 11 characters long')
    .custom(async (value) => {
      /**
       * Check is value is bigger than 0
       */
      if (value < 0) throw new Error('Cedula must be a valid cedula')
      /**
       * Check if cedula is already in use
       */
      const patient = await getPatientByCedula(value)
      if (patient) throw new Error('Cedula already in use')
      return true
    }),
  check('age')
    .exists().withMessage('Age is required')
    .isInt().withMessage('Age must be an integer')
    .isLength({ min: 1, max: 3 }).withMessage('Age must be 1 to 3 characters long')
    .custom((value) => {
      /**
       * Check if age is between 0 and 135
       */
      if (value < 0 || value > 135) throw new Error('Age must be between 0 and 120')
      return true
    }),
  check('email')
    .exists().withMessage('Email is required')
    .isEmail().withMessage('Email must be a valid email')
    .custom(async (value) => {
      /**
       * Check if email is already in use
       */
      const patient = await getPatientByEmail(value)
      if (patient) throw new Error('Email already in use')
    }),
  check('phone')
    .exists().withMessage('Phone is required')
    .isInt().withMessage('Phone must be an integer')
    .custom((value) => {
      /**
       * Check is value is bigger than 0
       */
      if (value < 0) throw new Error('Phone must be a valid phone')
      return true
    })
    .isLength({ min: 10, max: 10 }).withMessage('Phone must be 10 characters long'),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next)
  }
]

export { validatePostPatient }