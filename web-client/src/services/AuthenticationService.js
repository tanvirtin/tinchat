import { Service } from './Service';

export class AuthenticationService extends Service {
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
        return this.post({ url: `login`, data: formData });
    }

    static register (form) {
        const formData = this.parseFormData(form);
        return this.post({ url: `register`, data: formData });
    }

    static logout (token) {
        return this.post({ url: 'logout', token });
    }
};
