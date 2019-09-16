import { IsNotEmpty, IsEmail } from 'class-validator';

/**
 * @class
 * Class represents user's post data object received from the user when creating a message.
 */
export class CreateMessageDTO {
    @IsNotEmpty()
    @IsEmail()
    from: string;

    @IsNotEmpty()
    @IsEmail()
    to: string;

    @IsNotEmpty()
    message: string;
}
