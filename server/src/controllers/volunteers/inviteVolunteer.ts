import { Request, Response } from "express"

const inviteVolunteer = async (req: Request, res: Response) => {
  const { email, name, isAdmin } = req.body

}

export default inviteVolunteer