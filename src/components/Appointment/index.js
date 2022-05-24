import React from "react";
import "./styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty"
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status"




 function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE"
  const SAVING = "SAVING"
  const DELETE = "DELETE"

 


  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY,
    );
    function save(name, interviewer) {
      
      const interview = {
        student: name,
        interviewer
      };
      transition(SAVING)
      props.bookInterview(props.id, interview)
      .then(res => {
        transition(SHOW) 
      } )
      
    }
    return (
      <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer.name}
        onDelete={() => transition(DELETE) && transition(EMPTY)}
        />
        )}
      {mode === SAVING && <Status message="Saving"/>}
      {mode === CREATE && <Form onCancel={back}  interviewers={props.interviewers} onSave={save}  />}
      {mode === DELETE && <Status message="Deleting" />}


    </article>
  );

}

export default Appointment;