import { useState } from "react";

// modes to allow transitions
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]); 
  
  function transition(New, replace = false) {
    if (replace === true) {
      setHistory([initial, New])
    }
    setMode(New)
    history.push(New)
  }
  
  function back() {
    if (history.length > 1) {
    history.pop()
    setMode(history[history.length - 1])
    }
  }
  return { mode, transition, back};
}

