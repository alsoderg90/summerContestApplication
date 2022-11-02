describe('team creation', () => {
  const teamName = 'Test Team 1'
  const memberName = 'Test User 1'
  const nationality = 'Albania'

  it('can add a team', () => {
    cy.visit('https://localhost:44487')
    cy.contains('Dashboard').click()
    cy.contains(/Teams/).click()
    cy.get('input[name="name"]').type(teamName)
    cy.get(
      'div[aria-labelledby="mui-component-select-members"]'
    ).click()
    cy.contains(memberName).click()
    cy.contains('Submit').click({ force: true })
  })

  it('team is added to list', () => {
    cy.contains('button', 'Teams').click({ force: true })
    cy.contains(teamName)
    cy.contains(memberName)
    cy.get('img').invoke('attr', 'alt').should('eq', nationality)
  })

  it('cant delete member without authentication', () => {
    cy.get('button[data-testing-id="delete-btn').click({
      force: true
    })
    cy.get('.modal-dialog').should('exist')
    cy.contains('Delete').click({ force: true })
    cy.get('.modal-dialog').should('exist')
    cy.contains('Access denied')
    cy.contains('Refresh').click({ force: true })
    cy.get('.modal-dialog').should('not.exist')
    cy.wait(500)
  })
})
