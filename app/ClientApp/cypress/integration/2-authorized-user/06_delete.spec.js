describe('authorized user can delete data', () => {
  const email = 'e2eTestUser@myapp.fi'
  const password = '!passpass'
  const newMemberName = 'Edited User 1'
  const newTeamName = 'Edited Team 2'
  beforeEach(() => {
    cy.login({ email, password })
  })

  it('location can be deleted', () => {
    cy.get('.leaflet-marker-icon').click()
    cy.getWithId('button', 'delete-btn').eq(1).click()
    cy.get('.modal-dialog').should('exist')
    cy.contains('Delete').click()
    cy.contains('Dashboard').click()
    cy.contains(/Members/).click()
    cy.contains('button', 'Members').click()
    cy.contains('td', 0)
  })

  it('team can be deleted', () => {
    cy.contains('Dashboard').click()
    cy.contains(/Teams/).click()
    cy.contains('button', 'Teams').click()
    cy.getWithId('button', 'delete-btn').click()
    cy.get('.modal-dialog').should('exist')
    cy.contains('Delete').click()
    cy.contains(newTeamName).should('not.exist')
  })

  it('member can be edited', () => {
    cy.contains('Dashboard').click()
    cy.contains(/Members/).click()
    cy.contains('button', 'Members').click()
    cy.getWithId('button', 'delete-btn').click()
    cy.get('.modal-dialog').should('exist')
    cy.contains('Delete').click()
    cy.contains(newMemberName).should('not.exist')
  })
})
