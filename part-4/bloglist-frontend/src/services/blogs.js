import axios from 'axios'
const baseUrl = 'http://localhost:3001/blogs'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const remove = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const change = (id, changedBlog) => {
    const request = axios.put(`${baseUrl}/${id}`, changedBlog)
    return request.then(response => response.data)
}

export default { getAll, create, remove, change }
