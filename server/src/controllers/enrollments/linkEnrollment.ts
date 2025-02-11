import { Request, Response } from "express";
import CryptoJS from 'crypto-js';
import getData from "../../utils/getData";
import { verifyWithGeneratedLink } from "../../gql/enrollments/queries";
import { capitaliseStr, formatDate } from "../../utils/global";
import { addVolunteerEnrollment } from "../../gql/enrollments/mutations";

const linkEnrollment = async (req: Request, res: Response) => {
  const { verify } = req.body;
  try {
    const ticket = verify.replaceAll(' ', '+');
    delete req?.body?.verify;
    let ticketData: any = CryptoJS.AES.decrypt((ticket), process.env.CRYPTO_TICKET || '').toString(CryptoJS.enc.Utf8);
    if(!ticketData) {
      return res.status(400).json({
        status: 'error',
        message: 'Ticket sent is not valid. Please request admin for another link!',
      });
    }
    ticketData = JSON.parse(ticketData);
    const verifyData = await getData(verifyWithGeneratedLink, ticketData);
    if(verifyData?.errors)
    {
      return res.status(400).json({
        status: 'error',
        message: verifyData?.errors[0]?.message,
      });
    }
    if(!verifyData?.data?.enrollment_link_tickets?.length)
    {
      return res.status(404).json({
        status: 'error',
        message: 'Ticket sent does not exist. Please request admin for another link!',
      });
    }
    const created = new Date(verifyData?.data?.enrollment_link_tickets[0]?.created_at)
    const now = new Date()
    const diffTime = now.getTime() - created.getTime()
    const diffDays = Math.round(diffTime/(24*3600*1000))
    if(diffDays>=1)
    {
      return res.status(400).json({
        status: 'error',
        message: 'Ticket sent is expired. Please request admin for another link!',
      });
    }

    const children = req?.body?.children?.map((child: any)=>{
      return {
        dob: formatDate(child.dob), 
        gender: child.gender, 
        name: capitaliseStr(child.name)
      }
    })

    const link_by = verifyData?.data?.enrollment_link_tickets[0]?.invited_by;
    const dataBody = {
      ...req?.body,
      enrolled_by: link_by ? link_by.toLowerCase() : null,
      state: capitaliseStr(req?.body?.state),
      name: capitaliseStr(req?.body?.name),
      email: req?.body?.email?.toLowerCase(),
      dob: formatDate(req?.body?.dob),
      children
    }

    const data = await getData(addVolunteerEnrollment, dataBody)
    if(data?.errors)
    {
      return res.status(400).json({
        status: 'error',
        message: data?.errors[0]?.message
      })
    }

    if(data?.data?.insert_enrollments?.affected_rows)
    {
      return res.status(200).json({
        status: 'success',
        message: 'Enrollment inserted successfully'
      })
    }

    return res.status(400).json({
      status: 'error',
      message: 'Something went wrong. Please try again later!'
    })
    
  }
  catch(err) {
    return res.status(400).json({
      status: 'error',
      message: 'Ticket sent might not be valid. Please request admin for another link or try again later!'
    })
  }
}
 
export default linkEnrollment;