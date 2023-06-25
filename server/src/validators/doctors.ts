import { check } from "express-validator"
import validateResult from "../utils/validate.handle"
import { NextFunction, Request, Response } from "express"
import DoctorModel from "../models/doctor"
import { specialities } from "../constants/constants"

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
    .isNumeric().withMessage('Cedula must be a number')
    .isLength({ min: 10, max: 10 }).withMessage('Cedula must be 10 characters long')
    .custom(async (value) => {
      /**
       * Check if cedula is already in use
       */
      const doctor = await DoctorModel.findOne({ cedula: value })
      if (doctor) {
        return Promise.reject('Cedula already in use')
      }
    }),
  check('speciality')
    .exists().withMessage('Speciality is required')
    .isString().withMessage('Speciality must be a string')
    .isIn(specialities).withMessage(`Speciality must be one of these values: ${specialities.join(', ')}`),
  check('office')
    .exists().withMessage('Office is required')
    .isString().withMessage('Office must be a string'),
  check('email')
    .exists().withMessage('Email is required')
    .isEmail().withMessage('Email must be a valid email'),
  check('phone')
    .exists().withMessage('Phone is required')
    .isNumeric().withMessage('Phone must be a number')
    .isLength({ min: 10, max: 10 }).withMessage('Phone must be 10 characters long'),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next)
  }
]

export { validatePostDoctor }