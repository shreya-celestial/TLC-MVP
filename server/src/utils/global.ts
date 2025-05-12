import moment from "moment";

export const capitaliseStr = (str: string) => {
  let s = str.trim().split('');
  let ans = '';
  for(let i=0;i<s.length;i++)
  {
    if(i === 0 || s[i-1] === ' ')
    {
      s[i] = s[i].toUpperCase()
    }
    else
    {
      s[i] = s[i].toLowerCase()
    }
    ans+=s[i];
  }
  return ans
}

export const formatDate = (date: string) => {
  // return new Date(date).toISOString()
  return moment(new Date(date)).format('YYYY-MM-DD')
}

// For Development Mode
// export const mailing_url = 'http://localhost:8080';
// export const redirecting_url = 'http://localhost:3000';

// For Production Mode
export const mailing_url = 'https://tlc-server.vercel.app';
export const redirecting_url = 'https://tlc-tech.vercel.app';