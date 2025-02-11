import { Request, Response } from "express";
import getData from "../../utils/getData";
import { VolunteerByEmail } from "../../gql/volunteers/queries";
import { randomUUID } from "crypto";
import { generateNewLinkId } from "../../gql/enrollments/mutations";
import CryptoJS from "crypto-js";
import { mailing_url } from "../../utils/global";

const newEnrolLink = async (req: Request, res: Response) => {
  const { linkBy } = req?.query;
  if(linkBy)
  {
    const data = await getData(VolunteerByEmail, {email: linkBy})
    if(!data?.data?.users.length) return res.status(404).json({
      status: 'error',
      message: 'Requesting Volunteer not found!'
    })  
    const ticket_id = randomUUID();
    const dbTicketData = await getData(generateNewLinkId, {ticket_id, invited_by: linkBy});
    if(dbTicketData?.errors) return res.status(400).json({
      status: 'error',
      message: dbTicketData?.errors[0]?.message
    });
    const ticketData = {
      ticket_id: dbTicketData?.data?.insert_enrollment_link_tickets_one?.ticket_id,
      created_at: dbTicketData?.data?.insert_enrollment_link_tickets_one?.created_at
    }
    try {
      let ticket: any = CryptoJS.AES.encrypt(JSON.stringify(ticketData), process.env.CRYPTO_TICKET || '')
      ticket = ticket.toString();
      return res.status(200).json({
        status: 'success',
        message: 'Link generated successfully!',
        data: {
          link: `${mailing_url}/enrollments/verifyEnrolLink?verify=${ticket}`
        }
      })
    }
    catch(err) {
      return res.status(400).json({
        status: 'error',
        message: 'Something went wrong. Please try again!'
      })
    }
  }
  return res.status(400).json({
    status: 'error',
    message: 'Please provide your email for Enrollment Invitation!'
  });
}
 
export default newEnrolLink;