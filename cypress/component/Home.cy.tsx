import Home from "../../frontend/src/components/Home";

describe("Home", () => {
  it("renders the intro copy and social links", () => {
    cy.mount(<Home />);

    cy.get('[data-testid="home-heading"]').should("contain.text", "Samuel Bush");
    cy.contains(
      "Senior IT Engineer at SecurityMetrics, Master of Computer Science",
    ).should("be.visible");

    cy.get('a[aria-label="LinkedIn"]')
      .should("have.attr", "href", "https://www.linkedin.com/in/samuelbush92/");

    cy.get('a[aria-label="GitHub"]')
      .should("have.attr", "href", "https://github.com/sbush92");
  });
});