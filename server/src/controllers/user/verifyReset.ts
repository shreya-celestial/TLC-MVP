import { Request, Response } from "express"
import getData from "../../utils/getData"
import { verifyResetQuery } from "../../gql/queries"

const verifyReset = async (req: Request, res: Response) => {
  if(req.params.token && req.params.token !== 'null' && req.params.token !== 'NULL'){
    const data = await getData(verifyResetQuery, {
      token: req.params.token
    })
    if(data?.data?.users?.length){
      return res.cookie('token', req?.params?.token).redirect(303, 'http://localhost:3000/')
    }
    return res.clearCookie('token').send('Error! Something went wrong. Please try again later.')
  }
  return res.clearCookie('token').send('Error! Page not found.')
}

export default verifyReset