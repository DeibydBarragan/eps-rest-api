import { param, validationResult } from 'express-validator'
import { type NextFunction, type Request, type Response } from 'express'
import { getDoctorById } from '../../services/doctor.services'

const validateDeleteDoctor = [
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
      else if (doctor.deleted_at != null) {
        throw new Error('Doctor already deleted')
      }
    }),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    next()
  }
]

export { validateDeleteDoctor }
