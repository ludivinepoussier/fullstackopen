import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  console.log("state now: ", state)
  console.log("action", action)
  
  switch (action.type) {
    case 'NEW_BLOG':
      return [...state, action.data]

    case 'INIT_BLOGS':
      return action.data

    case 'LIKE':
      const updatedBlog = action.data
      return state.map(blog =>
        blog.id !== updatedBlog.id ? blog : updatedBlog
      )

    case 'REMOVE':
      const removedBlog = action.data
      return state.filter(blog => blog.id !== removedBlog.id)

    default:
      if (!action.type.startsWith('@@') && !action.type.startsWith('SET_NOTIFICATION') && !action.type.startsWith('REMOVE_NOTIFICATION')) 
      throw new Error(`Unnexpected action type: ${action.type}`)
      return state
  }
}

export const deleteBlog = blogObject => {
  return async (dispatch) => {
    await blogService.remove(blogObject)
    dispatch({
      type: "REMOVE",
      data: blogObject
    })
  }
}

export const createBlog = blogObject => {
  return async dispatch => {
    const newBlog = await blogService.create(blogObject)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const likeBlog = (blogObject) => {
  return async (dispatch) => {
    const blog = { ...blogObject, likes: blogObject.likes + 1 }
    const updatedBlog = await blogService.update(blog)
    dispatch({
      type: "LIKE",
      data: updatedBlog
    })
  }
}

export default blogReducer
