import { BASEURL } from "./global";

export const dashboardDetails = async ({ user }) => {
  try {
    const response = await fetch(
      `${BASEURL}/dashboard`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${user.key}`,
        },
      }
    );
    return await response.json();
  } catch (err) {
    return {
      status: 'error',
      message: err,
    };
  }
};

export const dashboardWorkshops = async ({ user }) => {
  try {
    const response = await fetch(
      `${BASEURL}/workshops?pastOrUpcoming=upcoming&sort_by=start_date`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${user.key}`,
        },
      }
    );
    return await response.json();
  } catch (err) {
    return {
      status: 'error',
      message: err,
    };
  }
};
