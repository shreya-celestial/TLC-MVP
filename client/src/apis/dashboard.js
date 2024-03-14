export const dashboardDetails = async () => {
  try {
    const response = await fetch('https://tlc-two.vercel.app/dashboard');
    return await response.json();
  } catch (err) {
    return {
      status: 'error',
      message: err,
    };
  }
};

export const dashboardWorkshops = async () => {
  try {
    const response = await fetch(
      'https://tlc-two.vercel.app/workshops?pastOrUpcoming=upcoming&sort_by=start_date'
    );
    return await response.json();
  } catch (err) {
    return {
      status: 'error',
      message: err,
    };
  }
};
