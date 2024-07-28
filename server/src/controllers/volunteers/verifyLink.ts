import { Request, Response } from "express";
import CryptoJS from 'crypto-js';
import getData from "../../utils/getData";
import { verifyRequestedLink } from "../../gql/volunteers/queries";
import { redirecting_url } from "../../utils/global";

const verifyLink = async (req: Request, res: Response) => {
  const { verify } = req.query;
  let ticket: any = verify;
  try {
    ticket = ticket.replaceAll(' ', '+');
    let ticketData = CryptoJS.AES.decrypt((ticket), process.env.CRYPTO_TICKET || '').toString(CryptoJS.enc.Utf8);
    if (ticketData) {
      ticketData = JSON.parse(ticketData);
      const data = await getData(verifyRequestedLink, ticketData);
      if(data?.errors)
      {
        throw new Error(data?.errors[0]?.message);
      }
      if(!data?.data?.link_tickets?.length)
      {
        return res.status(404).send(`Your link maybe broken or has already been used. Please try again sometime later or try logging in! <a href="${redirecting_url}">Go to safety!</a>`)
      }
      const created = new Date(data?.data?.link_tickets[0]?.created_at)
      const now = new Date()
      const diffTime = now.getTime() - created.getTime()
      const diffDays = Math.round(diffTime/(24*3600*1000))

      if(diffDays>=5)
      {
        return res.status(400).send(`Invitation link expired! <a href="${redirecting_url}">Go to safety!</a>`)
      }
      return res.redirect(303, `${redirecting_url}/signup?verify=${ticket}`)
    }
    throw new Error();
  } 
  catch(err) {
    return res.status(400).send(`${err || 'Invalid link!'} <a href="${redirecting_url}">Go to safety!</a>`)
  }
}
 
export default verifyLink;