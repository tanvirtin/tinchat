import { IsNotEmpty } from 'class-validator';

/**
 * @class
 * Interface class for user data object.
 */
export class UserDTO {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;
}
