import axios from "axios";
const baseURL = 'http://localhost:3001'

const create = newObject => {
    return axios.post(`${baseURL}/persons`, newObject)
}

const deletePerosn = id => {
    return axios.delete(`${baseURL}/persons/${id}`)
}

const getAll = () => {
    return axios.get(`${baseURL}/persons`)
}

const updatePerson = (id, updatedInfo) => {
    return axios.put(`${baseURL}/persons/${id}`, updatedInfo)
}

export default {
    create: create,
    deletePerson: deletePerosn,
    getAll: getAll,
    updatePerson: updatePerson,
}