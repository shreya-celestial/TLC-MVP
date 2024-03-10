export const fetchRowDataWorkshop = function (workshop) {
  const fetchVolunteers = workshop?.workshop_volunteers?.map((w) => w.user);
  const fetchLeadVolunteers = workshop?.workshop_lead_volunteers?.map(
    (w) => w.user
  );
  const fetchParticipants = workshop?.workshop_participants?.map((w) => {
    const childrenNames = w.enrollment.children.map((child) => {
      return child.name;
    });
    return { ...w.enrollment, children: childrenNames.join(', ') };
  });

  const fetchMeetings = workshop?.meetings;

  return {
    fetchVolunteers,
    fetchLeadVolunteers,
    fetchParticipants,
    fetchMeetings,
  };
};
