import React, { useState } from 'react';
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

// form component to create appointment
function Form(props) {
  const [error, setError] = useState("");
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  
  //reset form
  const reset = () => {
    setStudent("");
    setInterviewer(null);
  }
  
  // cancel form
  const cancel = () => {
    props.onCancel()
    reset()
  }

  // validate form
  function validate() {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }
    if (interviewer === null) {
      setError("Please select an interviewer");
      return;
    }
    setError("");
  
    props.onSave(student, interviewer);
  }

  

  return (
    <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
      <form  autoComplete="off" onSubmit={event => event.preventDefault()}>
        <input
          className="appointment__create-input text--semi-bold"
          name="name"
          type="text"
          placeholder="Enter Student Name"
          value={student}
          onChange={(event) => setStudent(event.target.value)}
          data-testid="student-name-input"
        />
      </form>
      <section className="appointment__validation">{error}</section>
      <InterviewerList 
        interviewers={props.interviewers}
        value={interviewer}
        onChange={ setInterviewer}
      />
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button  danger onClick={cancel}>Cancel</Button>
        <Button confirm onClick={validate} >Save</Button>
      </section>
    </section>
    </main>
  )
}

export default Form;

