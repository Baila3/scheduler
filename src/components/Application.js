import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview } from "helpers/selectors";




export default function Application(props) {
  const setDay = day => setState({ ...state, day });
  // const setDays = (days) => { 
  //   setState(prev => ({ ...prev, days })) 
    
  // };
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointment: {},
    interviewers: {}
  })
  
  let dailyAppointments = [];
  dailyAppointments = getAppointmentsForDay(state, state.day)
 
  // console.log(state.interviewers)
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      // console.log(all[0].data); // first
      // console.log(all[1]); // second
      // console.log(all[2]); // third
      // console.log("all", all)
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
          return (
            <Appointment 
            key={appointment.id} 
            id={appointment.id}
            time={appointment.time}
            interview={interview}
            />
            )
            
        })}
      </section>
    </main>
  );
}
