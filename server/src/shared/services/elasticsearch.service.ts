import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';

@Injectable()
export class ElasticsearchService {
    private readonly client: Client;

    constructor() {
        this.client = new Client({ node: process.env.ES_HOST || 'http://localhost:9200' });
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
