import React from "react";
import classNames from "classnames";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

function InterviewerList(props) {
  
  function onChange(id) {
    props.onChange(id)
  }
  const Interviewers = props.interviewers.map(people => {
    return (
        <InterviewerListItem
          key={people.id}
          name={people.name}
          avatar={people.avatar} 
          selected={people.id === props.value}
          setInterviewer={() => onChange(people.id)}  
          />)
    })
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul  className="interviewers__list">
        {Interviewers}
      </ul>
    </section>
  )
}

export default InterviewerList;