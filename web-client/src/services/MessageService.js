import { Service } from './Service';

export class MessageService extends Service {
    static getConversation (convoWith, page, limit, token) {
        return this.get({ url: `api/conversation/${convoWith}/${page}/${limit}`, token });
    }
};
