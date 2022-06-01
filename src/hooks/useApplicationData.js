import { useState, useEffect } from "react";
import axios from "axios";

// helper functions
export default function useApplicationData() {
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })
  
  const setDay = day => setState({...state, day });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, [state.days])

  // count spots for given day
  const countSpots = (state) => {
    const currentDay = state.days.find((day) => day.name === state.day);
    const appointmentIds = currentDay.appointments;
  
    const spots = appointmentIds.filter((id) => !state.appointments[id].interview).length;
  
    return spots;
  }
  
  // update spots if needed
  const updateSpots = (state) => {
    const updatedState = {...state}
    const updatedDays = [...state.days];
    const updatedDay = {...state.days.find((day) => day.name === state.day)}
  
    const spots = countSpots(state);
    updatedDay.spots = spots
  
    const updatedDayIndex = state.days.findIndex(day => day.name === state.name)
    updatedDays[updatedDayIndex] = updatedDay;
  
    updatedState.days = updatedDays;
  
    return updatedState;
  }

  
  
  
// booking an interview
  async function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
      return axios.put(`/api/appointments/${id}`, {interview}).then(() => {  
      updateSpots(state)
      setState(prev => ({...prev, appointments}))
    })
  }

  // deleting an interview
  async function cancelInterview(id) {

    const appointment = {
      ...state.appointments[id],
      interview: null
    }

    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    return axios.delete(`/api/appointments/${id}`).then(() => {  
      updateSpots(state)
      setState(prev => ({...prev, appointments}))
    })
  }

  return {state, setDay, bookInterview, cancelInterview}
}