import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
    let component
    let mockHandler

    const blogTest = { 
      title: 'Testing with react-testing-library', 
      author: 'exerciser', 
      url: 'https://example.com', 
      likes: 100,
      user: {
        username: 'testuser'
      }
    }

    const userTest = { 
      name: 'Test user', 
      username: 'testuser' 
    }

  window.localStorage.setItem('loggedBlogappUser', JSON.stringify(userTest))

    beforeEach(() => {
      mockHandler = jest.fn()
      component = render(<Blog blog={blogTest} user={userTest} changeBlog={mockHandler} />)
    })

  test('only title and author by default', () => {
    const onlyTitleAndAuthor = component.container.querySelector('.notShowingDetails')
    const AllDetails = component.container.querySelector('.showingDetails')

    expect(onlyTitleAndAuthor).toBeVisible()
    expect(AllDetails).not.toBeVisible()
    expect(component.container).toHaveTextContent(
      'Testing with react-testing-library' && 'exerciser'
    )
  })

  test('url and likes after button show is clicked', () => {
    const showButton = component.getByText('show')
    const onlyTitleAndAuthor = component.container.querySelector('.notShowingDetails')
    const AllDetails = component.container.querySelector('.showingDetails')

    fireEvent.click(showButton)

    expect(AllDetails).toBeVisible()
    expect(onlyTitleAndAuthor).not.toBeVisible()
  })

  test('if the like button is clicked twice, the event handler is called twice', () => {
    const likeButton = component.getByText('like')

    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
