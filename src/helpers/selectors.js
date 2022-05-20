

export function getAppointmentsForDay(state, day) {
  let arr =[]

  const filteredDays = state.days.filter(date => date.name === day);
  if (filteredDays.length === 0) {
    return []
  }

  for (const items in state.appointments) {
    filteredDays[0].appointments.map(appointment => appointment === Number(items) 
    && arr.push(state.appointments[appointment]) )
  }

  return arr
}

export function getInterview(state, interview) {
   if (interview === null ) {
    return null
  }
 for (const interviewer in state.interviewers) {
   if (Number(interviewer) === interview.interviewer) {
    interview.interviewer = state.interviewers[interviewer]
   return interview
 }
}
}