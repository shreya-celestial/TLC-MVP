const BASE_URL = 'https://tlc-two.vercel.app/user';

export const signup = async ({ body }) => {
  const url = `${BASE_URL}/signup`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return await response.json();
};

export const signupInvite = async (body) => {
  const url = `https://tlc-two.vercel.app/volunteers/inviteSignup`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return await response.json();
};

export const login = async (body) => {
  const url = `${BASE_URL}/login`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return await response.json();
};

export const forgotPass = async (body) => {
  const url = `${BASE_URL}/forgotPass`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return await response.json();
};

export const resetPass = async (body) => {
  const url = `${BASE_URL}/resetPass`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return await response.json();
};

export const logStatus = async (body) => {
  try {
    const url = `${BASE_URL}/updateLogStatus`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return await response.json();
  }
  catch (err) {
    return {
      status: 'error',
      message: err
    }
  }
}