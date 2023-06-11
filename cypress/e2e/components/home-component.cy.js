/// <reference types="cypress" />
describe("Home component", () => {
  beforeEach(() => {});

  it.only("should display a list of all courses", () => {
    cy.fixture("courses.json").then((res) => {
      cy.intercept({ method: "GET", url: "/api/courses" }, res).as(
        "getAllCourses"
      );
    });

    cy.visit("/");
    cy.wait("@getAllCourses");
    cy.contains("All Courses");
    cy.get(".mdc-tab").as("tab-list");
    cy.get("@tab-list").should("have.length", 2);
    cy.get("@tab-list")
      .first()
      .should("have.class", "mdc-tab--active")
      .contains("Beginners");
    cy.get("@tab-list").last().contains("Advanced");
    cy.get(".mat-mdc-card").should("have.length", 9);
  });

  it("should update list of courses when category is selected", () => {
    cy.fixture("courses.json").then((res) => {
      cy.intercept({ method: "GET", url: "/api/courses" }, res).as(
        "getAllCourses"
      );
    });

    cy.visit("/");
    cy.wait("@getAllCourses");
    cy.contains("All Courses");
    cy.get(".mdc-tab").as("tab-list");
    cy.get("@tab-list").should("have.length", 2);
    cy.get("@tab-list")
      .first()
      .should("have.class", "mdc-tab--active")
      .contains("Beginners");
    cy.get("@tab-list").last().contains("Advanced");
    cy.get("@tab-list").last().click();
    // cy.get(".mat-mdc-card").should("have.length", 3);
    cy.get(".mat-mdc-tab-body-active .mat-mdc-card-title")
      .its("length")
      .should("be.gt", 1);

    cy.get(".mat-mdc-tab-body-active .mat-mdc-card-title")
      .first()
      .should("contain", "Angular Security Course");
  });

  it("should display a list of beginner courses", () => {
    cy.fixture("courses.json").then((res) => {
      const beginnerCourses = {
        payload: [...res.payload.filter((c) => c.category === "BEGINNER")],
      };
      const advancedCourses = {
        payload: [...res.payload.map((c) => c.category === "ADVANCED")],
      };

      cy.intercept({ method: "GET", url: "/api/courses" }, beginnerCourses).as(
        "getBeginnerCourses"
      );
    });

    cy.visit("/");
    cy.wait("@getBeginnerCourses");
    cy.contains("All Courses");
    cy.get(".mdc-tab").as("tab-list");
    cy.get("@tab-list").should("have.length", 1);
    cy.get("@tab-list").contains("Beginners");
    cy.get(".mat-mdc-card").should("have.length", 9);
  });

  it("should display a list of advanced courses", () => {
    cy.fixture("courses.json").then((res) => {
      const advancedCourses = {
        payload: [...res.payload.filter((c) => c.category === "ADVANCED")],
      };

      cy.intercept({ method: "GET", url: "/api/courses" }, advancedCourses).as(
        "getAdvancedCourses"
      );
    });

    cy.visit("/");
    cy.wait("@getAdvancedCourses");
    cy.contains("All Courses");
    cy.get(".mdc-tab").as("tab-list");
    cy.get("@tab-list").should("have.length", 1);
    cy.get("@tab-list").contains("Advanced");
    cy.get(".mat-mdc-card").should("have.length", 3);
  });
});
