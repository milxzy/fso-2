import axios from "axios";
const baseURL = 'http://localhost:3001'

const create = newObject => {
    return axios.post(`${baseURL}/persons`, newObject)
}

export default {
    create: create
}