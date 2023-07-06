import { check } from "express-validator"
import validateResult from "../../utils/validate.handle"
import { NextFunction, Request, Response } from "express"
import PatientModel from "../../models/patient"


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
    .isNumeric().withMessage('Cedula must be a number')
    .isLength({ min: 10, max: 10 }).withMessage('Cedula must be 10 characters long')
    .custom(async (value) => {
      /**
       * Check if cedula is already in use
       */
      const patient = await PatientModel.findOne({ cedula: value })
      if (patient) {
        throw new Error('Cedula already in use')
      }
    }),
  check('age')
    .exists().withMessage('Age is required')
    .isNumeric().withMessage('Age must be a number')
    .isLength({ min: 1, max: 3 }).withMessage('Age must be 1 to 3 characters long'),
  check('email')
    .exists().withMessage('Email is required')
    .isEmail().withMessage('Email must be a valid email')
    .custom(async (value) => {
      /**
       * Check if email is already in use
       */
      const patient = await PatientModel.findOne({ email: value })
      if (patient) {
        throw new Error('Email already in use')
      }
    }),
  check('phone')
    .exists().withMessage('Phone is required')
    .isNumeric().withMessage('Phone must be a number')
    .isLength({ min: 10, max: 10 }).withMessage('Phone must be 10 characters long'),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next)
  }
]

export { validatePostPatient }