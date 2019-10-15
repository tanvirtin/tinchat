import { restApiEndpoint } from '../config.json';
import axios from 'axios';

export class UserSearchService {
    static async search (searchTerm, token) {
        const options = {
            method: 'POST',
            headers: { 'authorization': `Bearer ${token}` },
            url: `${restApiEndpoint}/api/search/user`,
            data: {
                'query': {
                    'bool': {
                        'should': [
                            // match_phrase prefix returns documents that contain the words of a provided text, in the same order as provided.
                            { 'match_phrase_prefix': { 'firstName': searchTerm } },
                            { 'match_phrase_prefix': { 'lastName': searchTerm } },
                        ],
                    },
                },
            },
        };
        const response = await axios(options);
        const { data: { body: { hits: { hits } } } } = response;
        const result = hits.map(result => result._source);
        return result;
    }
};
