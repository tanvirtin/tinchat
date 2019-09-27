/**
 * @class
 * Class represent's response object returned by the server to the user when a message has been successfully created.
 */
export class MessageResponseDTO {
    id: string;
    createdDate: Date;
    message: string;
    from: string;
    to: string;
    seen: boolean;
    delivered: boolean;
}
