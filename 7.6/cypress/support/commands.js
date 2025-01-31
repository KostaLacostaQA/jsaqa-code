// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (email, password) => {
    if (email) {
    cy.get('#mail').type(email);
    }

    if (password) {
    cy.get('#pass').type(password);
    }
     
    cy.contains('Submit').click();
})

Cypress.Commands.add('validity', (selector) => {
    cy.get(selector).then((el) => {
        return el[0].checkValidity()
      }).should('be.false')
})

Cypress.Commands.add("AddNew", (book) => {
  cy.contains('Add new').click();

  if(book) {
    cy.get('#title').type(book.title);
    cy.get('#description').type(book.description);
    cy.get('#authors').type(book.author);
  }

  cy.contains('Submit').click();
});