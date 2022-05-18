import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss";

function InterviewerListItem(props) {
  const InterviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected === true,
  })
  function setInterview(id) {
    props.setInterviewer(id)
  }
  return (
    <li onClick={() => setInterview(props.id)} className={InterviewerClass}>
    <img
      className="interviewers__item-image"
      src={props.avatar}
      alt="Sylvia Palmer"
    />
    {props.selected && props.name}
    </li>
  )

}

export default InterviewerListItem;