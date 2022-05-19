import React from "react";
import DayListItem from "./DayListItem";
import "components/DayListItem.scss";

export default function DayList(props) {
  const Date = props.days.map(day => {
  return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots} 
        selected={day.name === props.value}
        setDay={props.setDay}  
        />)
  })

  return (
    <ul>
      {Date}
    </ul>
    
  )
}

