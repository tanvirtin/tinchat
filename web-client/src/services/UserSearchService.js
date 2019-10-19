import { Service } from './Service';

export class UserSearchService extends Service {
    static async search (searchTerm, token) {
        const options = {
            url: `api/search/user`,
            token,
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
        const response = await this.post(options);
        const { data: { body: { hits: { hits } } } } = response;
        const result = hits.map(result => result._source);
        return result;
    }
};
