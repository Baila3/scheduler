import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

// daylistitem component for single day
export default function DayListItem(props) {
  const DayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected === true,
    "day-list__item--full": props.spots === 0
  })
// function to identify number of spots remaining
  function formatSpots(spots) {
    if (spots === 0) {
      return "no spots remaining"
    } else if (spots === 1) {
      return "1 spot remaining"
    } else {
      return `${spots} spots remaining`
    }
  }

  const spots = formatSpots(props.spots)
  return (
    <li onClick={() => props.setDay(props.name)} className={DayClass}>
      <h2 className="text--regular" >{props.name}</h2> 
      <h3 className="text--light">{spots}</h3>
    </li>
  );
}