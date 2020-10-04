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
      const id = action.data.id
      const likedBlog = state.find(it => it.id === id)
      const updatedBlog = {
        ...likedBlog,
        likes: likedBlog.likes + 1
      }
      return state.map(blog =>
        blog.id !== id ? blog : updatedBlog
      )

    default:
      if (!action.type.startsWith('@@') && !action.type.startsWith('SET_NOTIFICATION') && !action.type.startsWith('REMOVE_NOTIFICATION')) 
      throw new Error(`Unnexpected action type: ${action.type}`)
      return state
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

export const likeBlog = (likedBlog) => {
  return async (dispatch) => {
    const blog = { ...likedBlog, likes: likedBlog.likes + 1 }
    const updatedBlog = await blogService.update(blog)
    dispatch({
      type: "LIKE",
      data: updatedBlog
    })
  }
}

export default blogReducer
