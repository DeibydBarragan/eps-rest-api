import { param, validationResult } from 'express-validator'
import { type NextFunction, type Request, type Response } from 'express'
import { getAppointmentById } from '../../services/appointment'

const validateDeleteAppointment = [
  param('id')
    .notEmpty()
    .withMessage('El parámetro "id" no debe estar vacío')
    .isMongoId()
    .withMessage('El parámetro "id" debe ser un ID de MongoDB válido')
    .custom(async (value) => {
      /**
       * Check if appointment exists
       */
      const appointment = await getAppointmentById(value)
      if (appointment == null) {
        throw new Error('Appointment does not exist')
      } else if (appointment.deleted_at != null) {
        throw new Error('Appointment already deleted')
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

export { validateDeleteAppointment }
