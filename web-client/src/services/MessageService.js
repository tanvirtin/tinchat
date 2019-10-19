import { Service } from './Service';

export class MessageService extends Service {
    static async getConversation (convoWith, page, limit, token) {
        const response = await this.get({ url: `api/conversation?with=${convoWith}&page=${page}&limit=${limit}`, token });
        return response && response.data && response.data.items;
    }
    static sendMessage (data, token) {
        return this.post({ url: 'api/message', data, token });
    }
};
