import { restApiEndpoint } from '../config.json';
import axios from 'axios';

export class Service {
    static post ({ url, data, token }) {
        const options = {
            method: 'POST',
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
}
