

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

export function getInterviewersForDay(state, day) {

  if (!state.days.length) {
    return []
  }

  let interviewersArray = state.days.filter(x => x.name === day)
  
  if (interviewersArray.length === 0) {
    return []
  } else {
    interviewersArray = interviewersArray[0].interviewers;
  }

  let finalArray = [];
  for (let interviewer of interviewersArray) {
    if (interviewer in state.interviewers) {
    finalArray.push(state.interviewers[interviewer])
    }
  }
  return finalArray
}

export function getInterview(state, interview) {
   if (interview === null ) {
    return null
  }
 for (const interviewer in state.interviewers) {
   if(interview.interviewer !== null) {
      if (Number(interviewer) === interview.interviewer.id) {
        interview.interviewer = state.interviewers[interviewer]
        return interview
      }
   }
   if (Number(interviewer) === interview.interviewer) {
    interview.interviewer = state.interviewers[interviewer]
   return interview
 }
}
}
