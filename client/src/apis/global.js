export const getLocationData = async (code) => {
  const url = `https://api.postalpincode.in/pincode/${code}`;
  const response = await fetch(url)
  const res = await response.json()
  const data = {
    results: {}
  }
  const codes = res[0]?.PostOffice?.map((office) => {
    return {
      ...office,
      city: office?.Name,
      state: office?.State
    }
  })
  data.results[`${code}`] = codes
  return data
}