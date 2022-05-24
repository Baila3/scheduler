import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";




export default function Application(props) {
  const setDay = day => setState({...state, day });

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })
  
  let dailyAppointments = [];
  dailyAppointments = getAppointmentsForDay(state, state.day)
  const Interviewers = getInterviewersForDay(state, state.day)

  

  async function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
     return axios.put(`/api/appointments/${id}`, {interview}).then(res =>{
      setState(prev => ({...prev, appointments}))
    })
   
  }

  function cancelInterview(id) {

    const appointment = {
      ...state.appointments[id],
      interview: null
    }

    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    return axios.delete(`/api/appointments/${id}`)
      .then(res => {
        setState(prev => ({...prev, appointments}))
      })
  }

  

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, [])
                                                                                                                                                                                                                                                                                                                               
  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
        />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
        <DayList 
          days={state.days}
          value={state.day}
          setDay={setDay}
          />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {dailyAppointments.map(appointment => {
          const interview = getInterview(state , appointment.interview);
          // console.log("debug", interview)
          return (
            <Appointment 
            key={appointment.id} 
            id={appointment.id}
            time={appointment.time}
            interview={interview}
            interviewers={Interviewers}
            bookInterview={ bookInterview}
            cancelInterview={cancelInterview}
            />
            )
        })}
      </section>
    </main>
  );
}

