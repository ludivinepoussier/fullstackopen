import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async changedObject => {
  const config = {
    headers: { Authorization: token },
  }

  const { id: _notUsedId, ...payload } = changedObject
  payload.user = payload.user.id

  const response = await axios.put(`${baseUrl}/${changedObject.id}`, payload, config)
  return response.data
}

const remove = async removedObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(`${baseUrl}/${removedObject.id}`, config)
  return response.data
}

export default { setToken, getAll, create, update, remove }
