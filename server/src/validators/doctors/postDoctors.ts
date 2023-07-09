import { check } from "express-validator"
import validateResult from "../../utils/validate.handle"
import { NextFunction, Request, Response } from "express"
import { specialities } from "../../constants/constants"
import { getDoctorByCedula, getDoctorByEmail } from "../../services/doctor"

const validatePostDoctor = [
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
      const doctor = await getDoctorByCedula (value)
      console.log(doctor)
      if (doctor) throw new Error('Cedula already in use')
      return true
    }),
  check('speciality')
    .exists().withMessage('Speciality is required')
    .isString().withMessage('Speciality must be a string')
    .isIn(specialities).withMessage(`Speciality must be one of these values: ${specialities.join(', ')}`),
  check('office')
    .exists().withMessage('Office is required')
    .isInt().withMessage('Office must be an integer')
    .custom((value) => {
      console.log(value)
      /**
       * Check is value is bigger than 0
       * Check if office is between 100 and 999
       */
       if (value < 100 || value > 999) throw new Error('Office must be between 100 and 999')
       return true
      }),
  check('email')
    .exists().withMessage('Email is required')
    .isEmail().withMessage('Email must be a valid email')
    .custom(async (value) => {
      /**
       * Check if email is already in use
       */
      const doctor = await getDoctorByEmail(value)
      if (doctor) throw new Error('Email already in use')
    }),
  check('phone')
    .exists().withMessage('Phone is required')
    .isInt().withMessage('Phone must be an integer')
    .custom((value) => {
      console.log(value)

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

export { validatePostDoctor }