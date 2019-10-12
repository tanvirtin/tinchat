import { restApiEndpoint } from '../config.json';
import axios from 'axios';

export default class {
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
    static async login (form) {
        const formData = this.parseFormData(form);
        try {
            return await axios.post(`${restApiEndpoint}/login`, formData);
        } catch (err) {
            throw err;
        }
    }
};
