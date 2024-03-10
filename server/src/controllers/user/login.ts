import { Request, Response } from 'express';
import CryptoJS from 'crypto-js';
import getData from '../../utils/getData';
import { getUserByEmail } from '../../gql/user/queries';
import { updateStatus } from '../../gql/user/mutations';

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: 'Please provide email and password!' });
  }

  const query = getUserByEmail;
  const variables = {
    email,
  };

  const data = await getData(query, variables);
  const user = data?.data.users[0];

  if (!data?.data.users.length) {
    return res
      .status(401)
      .json({ status: 'error', message: 'Invalid Credentials' });
  }

  const decryptPass = CryptoJS.AES.decrypt(
    user?.password,
    process.env.CRYPTO_HASH_KEY || ''
  );

  const decryptedPass = decryptPass.toString(CryptoJS.enc.Utf8);

  if (decryptedPass !== password)
    return res.status(401).json({
      status: 'error',
      message: 'Invalid Credentials',
    });

  if (!user.isVerified) {
    return res.status(401).json({
      status: 'error',
      message: 'Email is not verified. Please follow instructions sent on mail',
    });
  }

  if (!user.isAdminVerified) {
    return res.status(403).json({
      status: 'error',
      message:
        'Your account is not verified yet. Please contact your admin for more details.',
    });
  }
  let userToSend: any = {};
  for (let keys in user) {
    if (keys !== 'password') userToSend[keys] = user[keys];
  }
  const encryptKey = CryptoJS.AES.encrypt(email, process.env.LOGIN_KEY || '')
  const updateUserStatus = await getData(updateStatus, {
    email, isLoggedIn: encryptKey.toString()
  })
  userToSend = {
    ...userToSend,
    key: encryptKey.toString()
  }
  if(updateUserStatus?.data?.update_users?.affected_rows)
  {
    return res.status(200).json({ status: 'success', user: userToSend });
  }
  return res.status(400).json({ status: 'error', message: 'Something went wrong. Please try again later!' });
};

export default login;
