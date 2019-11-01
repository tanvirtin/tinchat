import { Injectable } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';

@Injectable()
export class SearchService {

    private readonly client: Client;

    constructor() {
        this.client = new Client({ node: `http://${process.env.ES_HOST}:${process.env.ES_PORT}` || 'http://localhost:9200' });
    }

    async index(index: string, document: object): Promise<void> {
        await this.client.index({
            index,
            body: document,
        });
    }

    async search(index: string, query: object): Promise<object> {
        return this.client.search({
            index,
            body: query,
        });
    }

}
