

export function getAppointmentsForDay(state, day) {
  let arr =[]

  const filteredDays = state.days.filter(date => date.name === day);
  if (filteredDays.length === 0) {
    return []
  }

  for (const items in state.appointments) {
    filteredDays[0].appointments.map(appointment => appointment === Number(items) 
    && arr.push(state.appointments[appointment]) )
    console.log("arr",arr)
  }

  return arr
}