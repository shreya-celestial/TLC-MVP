import { Request, Response } from "express"
import { capitaliseStr, formatDate } from "../../utils/global"
import getData from "../../utils/getData"
import { addEnrollment } from "../../gql/enrollments/mutations"
import { verifyEnrollmentsInvite } from "../../gql/enrollments/queries"

const newEnrollment = async (req: Request, res: Response) => {
  if (req.body.token && req.body.token !== 'null' && req.body.token !== 'NULL') {
    const verifyEmail = await getData(verifyEnrollmentsInvite, { token: req.body.token })
    if (verifyEmail?.errors) {
      return res.status(400).json({
        status: 'error',
        message: verifyEmail?.errors[0]?.message
      })
    }
    if (!verifyEmail?.data?.enrollment_invites?.length) {
      return res.status(404).json({
        status: 'error',
        message: "Invitation doesn't exist."
      })
    }
    if (verifyEmail?.data?.enrollment_invites[0]?.email !== (req.body.email.replace('%40', '@')).toLowerCase()) {
      return res.status(404).json({
        status: 'error',
        message: "Invitation doesn't exist for the given email."
      })
    }

    const children = req?.body?.children?.map((child: any) => {
      return {
        dob: formatDate(child.dob),
        gender: child.gender,
        name: capitaliseStr(child.name)
      }
    })

    const inviteData = verifyEmail?.data?.enrollment_invites[0];
    const variables = {
      ...req?.body,
      enrolled_by: inviteData?.invited_by ? (inviteData?.invited_by).toLowerCase() : null,
      mobile_number: inviteData?.mobile_number,
      state: capitaliseStr(req?.body?.state),
      name: capitaliseStr(inviteData?.name),
      email: (inviteData?.email).toLowerCase(),
      token: req.body.token,
      children
    }

    const data = await getData(addEnrollment, variables)
    if (data?.errors) {
      return res.status(400).json({
        status: 'error',
        message: data?.errors[0]?.message
      })
    }
    if (data?.data?.insert_enrollments?.affected_rows && data?.data?.delete_enrollment_invites?.affected_rows) {
      return res.status(200).json({
        status: 'success',
        message: "User enrolled successfully!"
      })
    }
    return res.status(400).json({
      status: 'error',
      message: "Something went wrong. Please try again later!"
    })
  }

  return res.status(400).json({
    status: 'error',
    message: "Invalid Enrollment Invitation!"
  })

}

export default newEnrollment