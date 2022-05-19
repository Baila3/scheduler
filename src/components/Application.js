import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";




export default function Application(props) {
  const setDay = day => setState({ ...state, day });
  const setDays = (days) => { 
    setState(prev => ({ ...prev, days })) 
    
  };
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointment: {}
  })
  
  useEffect(() => {
  axios.get('/api/days').then(response => {
    setDays(response.data)
  })
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
        {Object.values(appointments).map(appointment => {
          return (
            <Appointment 
              key={appointment.id} 
              {...appointment} 
            />
          )

        })}
      </section>
    </main>
  );
}
