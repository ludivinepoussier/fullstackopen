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

const update = async (id, changedObject) => {
  const { id: _notUsedId, ...payload } = changedObject
  payload.user = payload.user.id

  const response = await axios.put(`${baseUrl}/${id}`, payload)
  return response.data
}

export default { setToken, getAll, create, update }