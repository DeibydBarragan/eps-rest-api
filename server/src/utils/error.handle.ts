import { Response } from "express";

const handleHttp = (res: Response, error: string, errorRaw?:object | unknown) => {
  console.log(errorRaw)
  res.status(500)
  res.send({error})
}

export default handleHttp