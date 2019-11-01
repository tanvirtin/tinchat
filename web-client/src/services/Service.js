import axios from 'axios';

export class Service {
    static request ({ method, url, data, token }) {
        const options = {
            method,
            url: `${process.env.REACT_APP_REST_API_ENDPOINT || ''}/${url}`,
        };
        if (token) {
            options.headers = { 'authorization': `Bearer ${token}` };
        }
        if (data) {
            options.data = data;
        }
        return axios(options);
    }
    static post ({ url, data, token }) {
        return this.request({ method: 'POST', url, data, token });
    }
    static get ({ url, data, token }) {
        return this.request({ method: 'GET', url, data, token });
    }
}
