import { IsNotEmpty, IsEmail } from 'class-validator';

/**
 * @class
 * Class represents user's post data object received from the user when logging in.
 */
export class UserLoginDTO {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}
