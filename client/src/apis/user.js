const BASE_URL = "http://localhost:8080/user";

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