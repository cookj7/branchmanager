import axios from 'axios'
import store from '../store'

class ApiClass {
    host = ''
    fetch = null

    constructor () {
        if (!process.env || !process.env.API_HOST) {
            throw 'Unable to initialise communication with API'
        }

        this.host = process.env.API_HOST
    }

    send(method, route, data = {}, headers = {}) {
        let config = {
            baseURL: this.host,
            url: route,
            method: method,
        }

        if (!!data && method === 'GET') {
            config.params = data
        }

        if (!!data && (method === 'POST' || method === 'PUT')) {
            config.data = data
        }

        return axios.request(config)
    }

    put (route, data) {
        return axios.put(this.host + route, data).then((response) => response.data)
    }

    post (route, data) {
        return axios.post(this.host + route, data).then((response) => response.data)
    }

    get (route, data = {}) {
        return axios.get(this.host + route, {params: data, headers: this.prepareHeaders()}).then((response) => response.data)
    }

    prepareHeaders() {
        let user = store.getters['security/user'];
        if (!user || !user.u_token) {
            return {};
        }

        return {
            Authorization: 'Bearer ' + user.u_token,
        };
    }
}

const api = new ApiClass()

export default api

