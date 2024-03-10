export const fetchRowDataEnrollment = function (enrollment) {
  const fetchWorkshops = enrollment?.workshop_participants?.map(
    (w) => w.workshop
  );

  return { fetchWorkshops };
};
