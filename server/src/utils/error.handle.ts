import { type Response } from 'express'

const handleHttp = (
  res: Response,
  error: string,
  errorRaw?: object | unknown
): void => {
  console.log(errorRaw)
  res.status(500)
  res.send({ error })
}

export default handleHttp
