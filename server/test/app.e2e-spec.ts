import * as request from 'supertest';

const app = 'http://localhost:4000';

describe('User Module', () => {
    it('/ (GET)', async () => {
        await request(app)
            .get('/')
            .expect(200)
            .expect('Hello World!');
    });
});