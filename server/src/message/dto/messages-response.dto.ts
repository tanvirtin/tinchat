
/**
 * @class
 * Class represent's response object returned by the server to the user when a message has been successfully created.
 */
export class MessagesResponseDTO {
    items: object;
    itemCount: number;
    pageCount: number;
    unseenItems: number;
}
