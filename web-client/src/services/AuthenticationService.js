import { restApiEndpoint } from '../config.json';
import axios from 'axios';

export class AuthenticationService {
    static parseFormData (form) {
        const { elements } = form;
        const data = {};
        for (const element of elements) {
            const { id, value } = element;
            if (id) {
                data[id] = value;
            }
        }
        return data;
    }
    static login (form) {
        const formData = this.parseFormData(form);
        return axios.post(`${restApiEndpoint}/login`, formData);
    }

    static register (form) {
        const formData = this.parseFormData(form);
        return axios.post(`${restApiEndpoint}/register`, formData);
    }
};
