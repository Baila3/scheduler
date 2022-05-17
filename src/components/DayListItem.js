import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  const DayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected === true,
    "day-list__item--full": props.spots === 0
  });
  return (
    <li onClick={() => props.setDay(props.name)} className={DayClass}>
      <h2 className="text--regular" >{props.name}</h2> 
      <h3 className="text--light">{props.spots} spots remaining</h3>
    </li>
  );
}