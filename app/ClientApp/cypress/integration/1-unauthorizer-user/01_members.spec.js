/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('member creation', () => {
  const memberName = 'Test User 1'
  const nationality = 'Albania'

  it('can add a member', () => {
    cy.visit('https://localhost:44487')
    cy.contains('Dashboard').click()
    cy.contains(/Members/).click()
    cy.get('input[name="name"]').type(memberName)
    cy.get('input[name="nationality"]').click()
    cy.contains(nationality).click()
    cy.contains('Submit').click()
  })

  it('member is added to list', () => {
    cy.contains('button', 'Members').click()
    cy.contains(memberName)
    cy.get('img').invoke('attr', 'alt').should('eq', nationality)
  })

  it('cant delete member without authentication', () => {
    cy.get('button[data-testing-id="delete-btn').click()
    cy.get('.modal-dialog').should('exist')
    cy.contains('Delete').click()
    cy.get('.modal-dialog').should('exist')
    cy.contains('Access denied')
    cy.contains('Refresh').click()
    cy.get('.modal-dialog').should('not.exist')
    cy.wait(500)
  })

  it('cant add member with existing name', () => {
    cy.contains('button', 'Form').click()
    cy.get('input[name="name"]').type(memberName)
    cy.get('input[name="nationality"]').click()
    cy.contains(nationality).click()
    cy.contains('Submit').click()
    cy.get('.modal-dialog').should('exist')
    cy.contains(`${memberName} is already added`)
    cy.contains('Refresh').click()
    cy.get('.modal-dialog').should('not.exist')
  })
})
