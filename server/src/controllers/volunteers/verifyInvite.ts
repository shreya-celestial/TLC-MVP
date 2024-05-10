import { Request, Response } from "express"
import getData from "../../utils/getData"
import { verifyVolunteerInvite } from "../../gql/volunteers/queries"
import { redirecting_url } from "../../utils/global"

const verifyInvite = async (req: Request, res: Response) => {
  const { invite } = req.query
  let token: any = invite
  token = token?.replaceAll(' ', '+')
  if(token && token !== 'null' && token !== 'NULL'){
    const data = await getData(verifyVolunteerInvite, {token})

    if(data?.errors)
    {
      return res.status(404).send(data?.errors[0]?.message+ ` <a href="${redirecting_url}">Go to safety!</a>`)
    }
    if(!data?.data?.Invitations?.length)
    {
      return res.status(404).send(`Your link maybe broken or has already been used. Please try again sometime later or try logging in! <a href="${redirecting_url}">Go to safety!</a>`)
    }

    const created = new Date(data?.data?.Invitations[0]?.created_at)
    const now = new Date()
    const diffTime = now.getTime() - created.getTime()
    const diffDays = Math.round(diffTime/(24*3600*1000))

    if(diffDays>=5)
    {
      return res.status(404).send(`Invitation expired! <a href="${redirecting_url}">Go to safety!</a>`)
    }
    return res.redirect(303, `${redirecting_url}/signup?ticket=${token}&for=${data?.data?.Invitations[0]?.email}`)
  }
  return res.status(404).send(`Error! Page not found. <a href="${redirecting_url}">Go to safety!</a>`)
}

export default verifyInvite