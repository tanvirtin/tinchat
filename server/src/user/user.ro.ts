
/**
 * @class
 * Interface class for user response object returned by the server.
 */
export class UserRO {
    id: string;
    username: string;
    created: Date;
    token?: string;
}
