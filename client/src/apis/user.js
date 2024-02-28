const BASE_URL = "http://localhost:8080/user";

export const signup = async (body) => {
  const url = `${BASE_URL}/signup`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
  return await response.json();
}

export const login = async (body) => {
  const url = `${BASE_URL}/login`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
  return await response.json();
}

export const forgotPass = async (body) => {
  const url = `${BASE_URL}/forgotPass`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
  return await response.json();
}

export const resetPass = async (body, cookies) => {
  const url = `${BASE_URL}/resetPass`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      cookies
    },
    body: JSON.stringify(body)
  })
  return await response.json();
}
