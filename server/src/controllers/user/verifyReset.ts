import { Request, Response } from "express"
import getData from "../../utils/getData"
import { verifyResetQuery } from "../../gql/user/queries"

const verifyReset = async (req: Request, res: Response) => {
  const { token: invite } = req?.query
  let token: any = invite
  token = token?.replaceAll(' ', '+')
  if(token && token !== 'null' && token !== 'NULL'){
    const data = await getData(verifyResetQuery, {
      token: token
    })
    if(data?.data?.users?.length){
      return res.redirect(303, `https://tlc-mvp-app-amber.vercel.app/resetPass?reset=${token}`)
    }
    return res.status(400).send('Error! Something went wrong. Please try again later.')
  }
  return res.status(404).send('Error! Page not found.')
}

export default verifyReset