import { Request, Response } from "express"
import getData from "../../utils/getData"
import { verifyVolunteerInvite } from "../../gql/volunteers/queries"

const verifyInvite = async (req: Request, res: Response) => {
  const { token } = req.params
  if(token && token !== 'null' && token !== 'NULL'){
    const data = await getData(verifyVolunteerInvite, {token})

    if(data?.errors)
    {
      return res.status(404).send(data?.errors[0]?.message)
    }
    if(!data?.data?.Invitations?.length)
    {
      return res.status(404).send('Something went wrong! Please try again!')
    }

    const created = new Date(data?.data?.Invitations[0]?.created_at)
    const now = new Date()
    const diffTime = now.getTime() - created.getTime()
    const diffDays = Math.round(diffTime/(24*3600*1000))

    if(diffDays>=5)
    {
      return res.status(404).send('Invitation expired!')
    }
    return res.redirect(303, `https://tlc-mvp-app-amber.vercel.app/signup?token=${token}&for=${data?.data?.Invitations[0]?.email}`)
  }
  return res.status(404).send('Error! Page not found.')
}

export default verifyInvite