import React from "react";
import { render } from "@testing-library/react";
import Application from "components/Application";
import Appointment from "components/Appointment/index"

// render appointment test
describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Appointment />);
  });
  

  it("does something it is supposed to do", () => {
    // ...
  });

  it("does something else it is supposed to do", () => {

  });
});