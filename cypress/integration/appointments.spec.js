
describe("Appointment", () => {
  it("should book an interview", () => {
    cy.visit("/")
    cy.contains("Monday")
    cy.get("[alt=Add]").first().click({force: true});
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones", {force: true});
    cy.get("[alt='Sylvia Palmer']").click({force: true});
    cy.contain("Save").click({force: true})
  })
})