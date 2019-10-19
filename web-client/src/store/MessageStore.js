import {
    observable,
    action,
} from 'mobx';

/**
 * This store serves as a cache for the message requests that
 * have been already retrieved from the server.
 */
export class MessageStore {
    // Keys of this object will be user email and values will be array of message objects.
    @observable messages = {}

    @action storeMessage (messages) {
        this.messages = messages;
    }
}
