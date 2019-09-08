import { IsNotEmpty } from 'class-validator';

/**
 * @class
 * Class represents user's post data object received from the user.
 */
export class UserRequestDTO {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;
}
