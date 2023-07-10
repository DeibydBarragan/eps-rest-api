import { type NextFunction, type Request, type Response } from 'express'
import {
  validationResult,
  type Result,
  type ValidationError
} from 'express-validator'

const validateResult = (
  req: Request,
  res: Response,
  next: NextFunction
): Response<unknown> | undefined => {
  const errors: Result<ValidationError> = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).send({ errors: errors.array() })
  }
  next()
}

export default validateResult
