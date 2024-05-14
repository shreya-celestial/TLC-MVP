import { Request, Response } from "express";
import getData from "../../utils/getData";
import { verifyEnrollmentsInvite } from "../../gql/enrollments/queries";
import { redirecting_url } from "../../utils/global";

const verifyEnrollmentInvite = async (req: Request, res: Response) => {
  const { invite } = req.query
  let token: any = invite
  token = token?.replaceAll(' ', '+')
  if (token && token !== 'null' && token !== 'NULL') {
    const data = await getData(verifyEnrollmentsInvite, { token })

    if (data?.errors) {
      return res.status(404).send(data?.errors[0]?.message + ` <a href="${redirecting_url}">Go to safety!</a>`)
    }
    if (!data?.data?.enrollment_invites?.length) {
      return res.status(404).send(`Your link maybe broken or has already been used. Please try again sometime later or try logging in! <a href="${redirecting_url}">Go to safety!</a>`)
    }

    const created = new Date(data?.data?.enrollment_invites[0]?.created_at)
    const now = new Date()
    const diffTime = now.getTime() - created.getTime()
    const diffDays = Math.round(diffTime / (24 * 3600 * 1000))

    if (diffDays >= 5) {
      return res.status(404).send(`Invitation expired! <a href="${redirecting_url}">Go to safety!</a>`)
    }
    return res.redirect(303, `${redirecting_url}/enrol?ticket=${token}&for=${data?.data?.enrollment_invites[0]?.email}&name=${data?.data?.enrollment_invites[0]?.name}&phone=${data?.data?.enrollment_invites[0]?.mobile_number}`)
  }
  return res.status(404).send(`Error! Page not found. <a href="${redirecting_url}">Go to safety!</a>`)
}

export default verifyEnrollmentInvite;