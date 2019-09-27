import { IsNotEmpty, IsEmail } from 'class-validator';

/**
 * @class
 * Class represents user's post data object received from the user when logging out.
 */
export class UserLogoutDTO {
    @IsNotEmpty()
    @IsEmail()
    email: string;
}
