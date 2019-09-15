import { IsNotEmpty, IsEmail } from 'class-validator';

/**
 * @class
 * Class represents user's post data object received from the user.
 */
export class UserRegisterDTO {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;
}
