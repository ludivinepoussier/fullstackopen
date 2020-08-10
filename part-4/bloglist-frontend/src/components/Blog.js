import React from 'react'

const Blog = ({ data, removeBlog }) => {
    return (
        <li>
            {`"${data.title}" by ${data.author}`}
            <br/>
            {<a href={data.address} target="_blank" rel="noopener noreferrer">{data.address}</a>}
            <br />
            {`Votes: ${data.upvotes}`}
            <br />
            <button onClick={() => removeBlog(data.id)}>delete</button>
        </li>
    )
}

export default Blog
