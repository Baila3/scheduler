import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss";

function InterviewerListItem(props) {
  const InterviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected === true,
  })
  
  return (
    <li onClick={props.setInterviewer} className={InterviewerClass}>
    <img
      className="interviewers__item-image"
      src={props.avatar}
      alt="Sylvia Palmer"
    />
    {props.selected && props.name }
    </li>
  )

}

export default InterviewerListItem;