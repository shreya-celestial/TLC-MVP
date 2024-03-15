import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken";

const auth = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req?.headers
  if(authorization)
  {
    let authToken: any = authorization.split('Bearer ');
    if(authToken?.length>1)
    {
      authToken = authToken[1];
      try{
        const token: any = jwt.verify(authToken, process.env.JWT_SECRET_KEY || '')
        if(token?.email)
        {
          return next()
        }
      }
      catch(err)
      {
        return res.status(401).json({
          status: 'error',
          message: 'Token expired!'
        })
      }
    }
    return res.status(401).json({
      status: 'error',
      message: 'Please provide a valid authorization token!'
    })
  }
  return res.status(401).json({
    status: 'error',
    message: 'Please provide an authorization token!'
  })
}

export default auth