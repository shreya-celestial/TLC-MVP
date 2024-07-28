import { randomUUID } from "crypto";
import CryptoJS from 'crypto-js';
import { Request, Response } from "express";
import getData from "../../utils/getData";
import { createNewLinkId } from "../../gql/volunteers/mutations";
import { mailing_url } from "../../utils/global";

const newLink = async (req: Request, res: Response) => {
  const ticket_id = randomUUID();
  const data = await getData(createNewLinkId, {ticket_id});
  if(data?.errors)
  {
    return res.status(400).json({
      status: 'error',
      message: data?.errors[0]?.message
    })
  }
  const ticketData = {
    ticket_id: data?.data?.insert_link_tickets_one?.ticket_id,
    created_at: data?.data?.insert_link_tickets_one?.created_at
  }
  try {
    let ticket: any = CryptoJS.AES.encrypt(JSON.stringify(ticketData), process.env.CRYPTO_TICKET || '')
    ticket = ticket.toString();
    return res.status(200).json({
      status: 'success',
      message: 'Link generated successfully!',
      data: {
        link: `${mailing_url}/volunteers/verifyLink?verify=${ticket}`
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
 
export default newLink;