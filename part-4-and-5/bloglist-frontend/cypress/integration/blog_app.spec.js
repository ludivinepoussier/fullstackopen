describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Ludivine Poussier',
      username: 'lpoussier',
      password: 'hardtocrack'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Blogs App')
    cy.contains('Log in to application')
    cy.contains('login')
  })

  describe('Login', function () {
    it('fails with wrong credentials', function () {
      cy.get('#username').type('lpoussier')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Ludivine Poussier logged in')
    })

    it('succeeds with correct credentials', function () {
      cy.get('#username').type('lpoussier')
      cy.get('#password').type('hardtocrack')
      cy.get('#login-button').click()

      cy.contains('Ludivine Poussier logged in')
    })
  })

  describe.only('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'lpoussier', password: 'hardtocrack' })
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('a blog title test')
      cy.get('#author').type('cypress')
      cy.get('#url').type('https://example.com')
      cy.contains('add to the blog list').click()
      cy.contains('a blog title test')
    })
  })
})
