

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
  let arr =[]

  const filteredDays = state.days.filter(date => date.name === day);
  if (filteredDays.length === 0) {
    return []
  }

  for (const interviewer in state.interviewers) {
    for (const items in state.appointments) {
      const app = state.appointments[items]
      if (app.interview !== null) {
         if (app.interview.interviewer === Number(interviewer)) {
            filteredDays[0].appointments.map(appointment => appointment === Number(items) 
            &&  arr.push(state.interviewers[interviewer]) )
          }
      }
    }   
  }
  const uniqueIds = [];  
  const unique = arr.filter(element => {   
    const isDuplicate = uniqueIds.includes(element.id);    
    if (!isDuplicate) {     
      uniqueIds.push(element.id);      
      return true;   
    }    
 return false; 
});  // 👇️ [{id: 1, name: 'Tom'}, {id: 2, name: 'Nick'}] console.log(unique);
  return unique
}

export function getInterview(state, interview) {
   if (interview === null ) {
    return null
  }
  console.log("bob",state, interview)
 for (const interviewer in state.interviewers) {
   if(typeof(interview.interviewer) === "object") {
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
