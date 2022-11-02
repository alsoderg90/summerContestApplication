describe('authorized user can edit data', () => {
  const email = 'e2eTestUser@myapp.fi'
  const password = '!passpass'
  const newMemberName = 'Edited User 1'
  const newNationality = 'Algeria'
  const newTeamName = 'Edited Team 2'
  beforeEach(function () {
    cy.login({ email, password })
  })

  it('member can be edited', () => {
    cy.contains('Dashboard').click()
    cy.contains(/Members/).click()
    cy.contains('button', 'Members').click()
    cy.getWithId('button', 'edit-btn').click()
    cy.get('input[name="name"]').clear().type(newMemberName)
    cy.get('input[name="nationality"]').click()
    cy.contains(newNationality).click()
    cy.contains('Submit').click()
    cy.contains('button', 'Members').click()
    cy.contains(newMemberName)
    cy.get('img').invoke('attr', 'alt').should('eq', newNationality)
    cy.contains(10)
    cy.contains('Dashboard').click()
    cy.contains(/Teams/).click()
    cy.contains('button', 'Teams').click()
    cy.contains(newMemberName)
    cy.get('img').invoke('attr', 'alt').should('eq', newNationality)
    cy.contains('Test Team 1')
    cy.contains(10)
    cy.get('.navbar-brand').click()
    cy.get('.leaflet-marker-icon').click()
    cy.contains('button', 'Stats').click()
    cy.contains('td', newMemberName)
    cy.contains('td', 10)
    cy.get('td')
      .children('img')
      .invoke('attr', 'alt')
      .should('eq', newNationality)
    cy.contains('td', 'Test Team 1')
  })

  it('team can be edited', () => {
    cy.contains('Dashboard').click()
    cy.contains(/Teams/).click()
    cy.contains('button', 'Teams').click()
    cy.getWithId('button', 'edit-btn').click()
    cy.get('input[name="name"]').clear().type(newTeamName)
    cy.get(
      'div[aria-labelledby="mui-component-select-members"]'
    ).click()
    cy.contains('li', newMemberName).click()
    cy.contains('Submit').click({ force: true })
    cy.contains('button', 'Teams').click({ force: true })
    cy.contains('td', newMemberName)
  })

  it('location can be edited', () => {
    cy.get('.navbar-brand').click()
    cy.get('.leaflet-marker-icon').click()
    cy.get('input[name="points[0].points"]').clear().type(20)
    cy.contains('button', 'Submit').click()
    cy.contains('Dashboard').click()
    cy.contains(/Members/).click()
    cy.contains('button', 'Members').click()
    cy.contains('td', 20)
  })
})
