describe("example to-do app", () => {
  const fields = [
    {
      name: "input[name=username]",
      value: "svetozar",
    },
    {
      name: "input[name=password]",
      value: "svetozar",
    },
  ];
  beforeEach(() => {
    cy.visit("/");
    cy.url().should("eq", "http://localhost:3000/");
  });

  it("open chat", () => {
    fields.forEach(({ name, value }) => {
      cy.get(name).type(value).should("have.value", value);
    });
  });
});
