/**
 * @class
 * Class represent's response object returned by the server to the user.
 */
export class UserResponseDTO {
    id: string;
    username: string;
    created: Date;
    // ? means token is optional
    token?: string;
}
