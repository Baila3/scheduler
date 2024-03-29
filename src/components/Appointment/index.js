import React from "react";
import "./styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty"
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status"
import Confirm from "./Confirm";
import Error from "./Error";





// appointment component to render appointments
export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETE = "DELETE";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT"
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  const ERROR_EDIT = "ERROR_EDIT"



// mode to allow transitioning between components
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY,
    );

    // transition after saving in form
    function save(name, interviewer) {
      
      const interview = {
        student: name,
        interviewer
      }

      transition(SAVING)
      props.bookInterview(props.id, interview)
      .then(res => {
        transition(SHOW) 
      })
      .catch((err) => {
        if (mode === EDIT) {
          transition(ERROR_EDIT, true)
        } else {
        transition(ERROR_SAVE, true)
        }
      })
      
      };
    
    // transition after deleting
  function Delete() {
    transition(DELETE, true)
    props.cancelInterview(props.id) 
    .then(res => {
    transition(EMPTY)
    })
  .catch((err) => transition(ERROR_DELETE, true))
};

  return (
    <article className="appointment">
    <Header time={props.time} />
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && (
      <Show
      student={props?.interview?.student || ''}
      interviewer={props?.interview?.interviewer?.name || ''} 
      onDelete={() => transition(CONFIRM)}
      onEdit={() => transition(EDIT)}
      />
    )}
    {mode === SAVING && <Status message="Saving"/>}
    {mode === CREATE && <Form onCancel={() => transition(EMPTY)}  interviewers={props.interviewers} onSave={save}  />}
    {mode === EDIT && <Form  onCancel={() => transition(SHOW)} student={props.interview.student} interviewer={props.interview.interviewer.id} interviewers={props.interviewers}  onSave={save} /> }
    {mode === DELETE && <Status message="Deleting" />}
    {mode === CONFIRM && <Confirm onCancel={back} onConfirm={Delete} message="Delete the appointment" /> }
    {mode === ERROR_DELETE && <Error message="Could not delete appointment." onClose={back} />}
    {mode === ERROR_SAVE && <Error  message="Could not save appointment." onClose={() => transition(CREATE)} />}
    {mode === ERROR_EDIT && <Error  message="Could not save appointment." onClose={() => transition(EDIT)} />}



  </article>
  );
}

