const getData = async (query: string, variables: any) => {
  try{
    const response = await fetch(process.env.HASURA_DB_URL || '', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET || '',
      },
      body: JSON.stringify({
        query, 
        variables
      })
    })
    return await response.json();
  }
  catch(err)
  {
    return {
      errors: [
        {
          message: err
        }
      ]
    }
  }
}

export default getData;