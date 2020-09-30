import React from 'react'
import ReactDOM from 'react-dom'
// import { createStore } from 'redux'
// import { Provider } from 'react-redux'
import App from './App'
// import { blogformReducer } from './reducers/blogformReducer'
// import { blogReducer } from './reducers/blogReducer'
// import { notificationReducer } from './reducers/notificationReducer'

// const store = createStore(blogReducer)

ReactDOM.render(
  // <Provider store={store}>
    <App />,
  // </Provider>,
  document.getElementById('root')
)
