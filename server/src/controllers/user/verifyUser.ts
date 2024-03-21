import { Request, Response } from "express"
import getData from "../../utils/getData"
import { VerifyTokenAndUpdate } from "../../gql/user/mutations"

const verifyUser = async (req: Request, res: Response) => {
  const { token: invite } = req?.query
  let token: any = invite
  token = token?.replaceAll(' ', '+')
  if(token && token !== 'null' && token !== 'NULL'){
    const data = await getData(VerifyTokenAndUpdate, {
      token: token,
      updatedToken: null,
      isVerified: true
    })
    if(data?.errors)
    {
      return res.status(400).send('Error! Please try again later. <a href="https://tlc-mvp-app-amber.vercel.app">Go to safety!</a>')
    }
    if(!data?.data?.update_users?.affected_rows)
    {
      return res.status(100).send('It seems that your link has been used. Please login and continue. <a href="https://tlc-mvp-app-amber.vercel.app">Go to safety!</a>')
    }
    return res.redirect(303,'https://tlc-mvp-app-amber.vercel.app/')
  }
  return res.status(404).send('Error! Page not found. <a href="https://tlc-mvp-app-amber.vercel.app">Go to safety!</a>')
}

export default verifyUser