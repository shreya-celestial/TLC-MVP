const ZIPCODE_API_KEY = 'c6d97520-d5f1-11ee-ad10-71ecb52c5f99'

export const getLocationData = async (code) => {
  const url = `https://app.zipcodebase.com/api/v1/search?apikey=${ZIPCODE_API_KEY}&codes=${code}&country=in`;
  const response = await fetch(url)
  return await response.json()
}