import { IsNotEmpty } from 'class-validator';

/**
 * @class
 * Class represents user's post data object received from the user when submitting a query post request.
 */
export class QueryDTO {
    @IsNotEmpty()
    query: object;
    from?: string;
}
