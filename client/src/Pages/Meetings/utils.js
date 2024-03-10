export const fetchRowDataMeeting = function (meeting) {
  const fetchVolunteers = meeting?.meetings_volunteers?.map((w) => w.user);
  const fetchEnrollments = meeting?.meetings_enrollments?.map(
    (w) => w.enrollment
  );

  return { fetchVolunteers, fetchEnrollments };
};
