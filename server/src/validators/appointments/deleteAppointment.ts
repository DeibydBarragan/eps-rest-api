import { param, validationResult } from "express-validator"
import { NextFunction, Request, Response } from "express"
import { getAppointmentById } from "../../services/appointment"

const validateDeleteAppointment = [
  param('id')
    .notEmpty().withMessage('El parámetro "id" no debe estar vacío')
    .isMongoId().withMessage('El parámetro "id" debe ser un ID de MongoDB válido')
    .custom(async (value) => {
      /**
       * Check if appointment exists
       */
      const appointment = await getAppointmentById(value)
      if (!appointment) return Promise.reject('Appointment does not exist')
      else if (appointment.deleted_at) return Promise.reject('Appointment already deleted')
    }),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  }
]

export { validateDeleteAppointment }