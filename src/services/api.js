import axios from 'axios'

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

    post (route, data) {
        return axios.post(this.host + route, {'key':'value'})
    }

    get (route, params) {

    }
}

const api = new ApiClass()

export default api

