import { Request, Response } from "express"
import getData from "../../utils/getData"
import { verifyResetQuery } from "../../gql/user/queries"

const verifyReset = async (req: Request, res: Response) => {
  if(req.params.token && req.params.token !== 'null' && req.params.token !== 'NULL'){
    const data = await getData(verifyResetQuery, {
      token: req.params.token
    })
    if(data?.data?.users?.length){
      return res.redirect(303, `http://localhost:3000/resetPass?reset=${req?.params?.token}`)
    }
    return res.status(400).send('Error! Something went wrong. Please try again later.')
  }
  return res.status(404).send('Error! Page not found.')
}

export default verifyReset