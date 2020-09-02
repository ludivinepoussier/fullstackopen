import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {

  test('updates parent state and calls onSubmit', () => {
    const createBlog = jest.fn()
    const component = render(
      <BlogForm createBlog={createBlog} />
    )

    const inputTitle = component.container.querySelector('#title')
    const inputAuthor = component.container.querySelector('#author')
    const inputUrl = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(inputTitle, {
      target: { value: 'testing of forms could be easier' }
    })
    fireEvent.change(inputAuthor, {
      target: { value: 'Ludivine Poussier' }
    })
    fireEvent.change(inputUrl, {
      target: { value: 'https://example.com' }
    })
    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('testing of forms could be easier')
    expect(createBlog.mock.calls[0][0].author).toBe('Ludivine Poussier')
    expect(createBlog.mock.calls[0][0].url).toBe('https://example.com')
  })
})
