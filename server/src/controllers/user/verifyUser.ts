import { Request, Response } from "express"
import getData from "../../utils/getData"
import { VerifyTokenAndUpdate } from "../../gql/mutations"

const verifyUser = async (req: Request, res: Response) => {
  if(req.params.token && req.params.token !== 'null' && req.params.token !== 'NULL'){
    const data = await getData(VerifyTokenAndUpdate, {
      token: req.params.token,
      updatedToken: null,
      isVerified: true
    })
    
    if(data?.errors)
    {
      return res.send('Error! Please try again later.')
    }
    if(data?.data?.update_users?.returning?.length === 0)
    {
      return res.send('It seems that your link has been used. Please login and continue.')
    }
    return res.redirect(303,'http://localhost:3000/')
  }
  return res.send('Error! Page not found.')
}

export default verifyUser