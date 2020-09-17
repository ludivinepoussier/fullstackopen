import React from 'react'
import { connect } from 'react-redux'
import { filterAnecdote } from '../reducers/filterReducer'

const Filter = (props) => {

  const handleChange = (event) => {
    const valueFilter = event.target.value
    props.filterAnecdote(valueFilter)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    filterAnecdote: value => {
      dispatch(filterAnecdote(value))
    },
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Filter)
