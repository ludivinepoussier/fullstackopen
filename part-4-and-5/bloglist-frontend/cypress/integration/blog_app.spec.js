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

  describe('When logged in', function () {
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

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'another blog cypress',
          author: 'cypress again',
          url: 'https://example.com'
        })
      })

      it('the like button can be clicked', function () {
        cy.contains('show').click()
        cy.contains('another blog cypress')
        cy.get('#like-button').click()
        
        cy.get('.success')
          .should('contain', 'blog updated')
          .and('have.css', 'color', 'rgb(0, 128, 0)')
          .and('have.css', 'border-style', 'solid')

        cy.get('html').should('contain', 'likes: 1')
      })
    })

    describe('and a blog can be deleted', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'blog to delete',
          author: 'cypress',
          url: 'https://example.com'
        })
      })

      it('the remove button appears and is being clicked', function () {
        cy.contains('show').click()
        cy.contains('remove').click()
        cy.on('window:confirm', (txt) => {
          expect(txt).to.contains('Delete blog to delete');
        })

        cy.get('.success')
          .should('contain', 'blog to delete has been deleted')
          .and('have.css', 'color', 'rgb(0, 128, 0)')
          .and('have.css', 'border-style', 'solid')

        cy.get('.blogList').should('not.contain', 'blog to delete')
      })
    })
  })
})
