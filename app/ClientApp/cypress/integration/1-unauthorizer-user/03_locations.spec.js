describe('location creation', () => {
  const teamName = 'Test Team 1'
  const memberName = 'Test User 1'
  const nationality = 'Albania'
  const points = 10

  it('can add a location', () => {
    cy.visit('https://localhost:44487')
    cy.get('.leaflet-container').click('center')
    cy.get('input[name="address"').then((value) => {
      let address = value
      cy.wrap(address).as('address')
    })

    cy.get('input[name="title"]').type('Test').blur()
    cy.getWithId('div', 'member-0').click()
    cy.contains(memberName).click()
    cy.get('input[name="points[0].points"]').clear().type(points)
    cy.contains('button', 'Submit').click()
    cy.get('.leaflet-marker-icon').should('exist')
  })

  it('points are updated in member list', () => {
    cy.contains('Dashboard').click()
    cy.contains(/Members/).click()
    cy.contains('button', 'Members').click()
    cy.contains(memberName)
    cy.contains(points)
    cy.get('img').invoke('attr', 'alt').should('eq', nationality)
  })

  it('points are updated in teams list', () => {
    cy.contains('Dashboard').click()
    cy.contains(/Teams/).click()
    cy.contains('button', 'Teams').click()
    cy.contains('button', teamName).click()
  })

  it('cant delete location if unauthorized user', () => {
    cy.get('.navbar-brand').click()
    cy.get('button[data-testing-id="delete-btn').eq(1).click()
    cy.get('.modal-dialog').should('exist')
    cy.contains('Delete').click()
    cy.get('.modal-dialog').should('exist')
    cy.contains('Access denied')
    cy.contains('Refresh').click()
    cy.get('.modal-dialog').should('not.exist')
    cy.wait(500)
  })

  it('location is added to list', () => {
    cy.get('.leaflet-marker-icon').click()
    cy.contains('button', 'Stats').click()
    cy.contains('td', memberName)
    cy.contains('td', points)
    cy.get('td')
      .children('img')
      .invoke('attr', 'alt')
      .should('eq', nationality)
    cy.contains('td', teamName)
  })
})
