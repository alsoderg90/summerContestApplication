describe('authentication', () => {
  const email = 'alexander.sodergard@gmail.com'
  const password = 'joujou'

  it('can login', () => {
    cy.visit('https://localhost:44487')
    cy.contains('Dashboard').click()
    cy.contains(/Settings/).click()
    cy.get('input[name="email"]').type(email)
    cy.get('input[name="password"]').type(password)
    cy.contains('button', 'Login').click()
    cy.contains(`Hello ${email}`)
  })

  it('can logout', () => {
    cy.contains('button', 'LogOut').click()
    cy.contains('Login')
  })

  it('login fails with wrong password', function () {
    cy.get('input[name="email"]').type(email)
    cy.get('input[name="password"]').type('Wrong password')
    cy.contains('button', 'Login').click()
    cy.get('.modal-dialog').should('exist')
    cy.contains('Wrong credentials')
    cy.contains('Refresh').click()
    cy.get('.modal-dialog').should('not.exist')
  })
})
