/**
 * @class
 * Class represent's response object returned by the server to the user upon registration/loging in.
 */
export class UserResponseDTO {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    createdDate: Date;
    // ? means token is optional
    token?: string;
}
