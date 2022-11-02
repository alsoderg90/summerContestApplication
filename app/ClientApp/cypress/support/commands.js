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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('getWithId', (element, id) => {
  cy.get(`${element}[data-testing-id="${id}"]`)
})

Cypress.Commands.add('login', ({ email, password }) => {
  cy.request('POST', 'https://localhost:44487/api/login', {
    email,
    password
  }).then((message) => {
    cy.log(message.body)
    window.localStorage.setItem('token', message.body)
    cy.visit('https://localhost:44487')
  })
})
