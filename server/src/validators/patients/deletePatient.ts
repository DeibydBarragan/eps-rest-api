import { param, validationResult } from "express-validator"
import { NextFunction, Request, Response } from "express"
import { getPatientById } from "../../services/patient"

const validateDeletePatient = [
  param('id')
    .notEmpty().withMessage('El parámetro "id" no debe estar vacío')
    .isMongoId().withMessage('El parámetro "id" debe ser un ID de MongoDB válido')
    .custom(async (value) => {
      /**
       * Check if patient exists
       */
      const patient = await getPatientById(value)
      if (!patient) return Promise.reject('Patient does not exist')
      else if (patient.deleted_at) return Promise.reject('Patient already deleted')
    }),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    next()
  }
]

export { validateDeletePatient }