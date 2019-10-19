import { restApiEndpoint } from '../config.json';
import axios from 'axios';

export class Service {
    static request ({ method, url, data, token }) {
        const options = {
            method,
            url: `${restApiEndpoint}/${url}`,
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
        return this.request({ url, data, token });
    }
    static get ({ url, data, token }) {
        return this.request({ url, data, token });
    }
}
