import * as request from 'supertest';
import * as faker from 'faker';
import * as assert from 'assert';

const app = 'http://localhost:4000';

const userResponseValidation = body => {
    assert.equal('id' in body, true);
    assert.equal('createdDate' in body, true);
    assert.equal('username' in body, true);
    assert.equal('password' in body, false);
};

const authenticationValidation = (res, username) => {
    assert.equal(res.body.username === username, true);
    assert.equal('authorization' in res.header, true);
};

describe('User Module', () => {
    let username;
    let password;
    let token;
    it('Register', async () => {
        username = faker.name.findName();
        password = faker.internet.password();
        const res = await request(app)
            .post('/register')
            .send({
                username,
                password,
            })
            .expect(201);
        userResponseValidation(res.body);
        authenticationValidation(res, username);
    });

    it('Login', async () => {
        const res = await request(app)
        .post('/login')
        .send({
            username,
            password,
        })
        .expect(201);
        userResponseValidation(res.body);
        authenticationValidation(res, username);
        token = res.header.authorization;
    });

    it('Get all users', async () => {
        const res = await request(app)
            .get('/api/users')
            .set('Authorization', token)
            .expect(200);
        res.body.forEach(userResponseValidation);
    });

    it('Get all users without token', async () => {
        request(app)
            .get('/api/users')
            .expect(403);
    });

    it('Logout', async () => {
        const res = await request(app)
            .post('/logout')
            .send({ username })
            .set('Authorization', token)
            .expect(201);
    });

    it('Logout without token', async () => {
        const res = await request(app)
            .post('/logout')
            .send({ username })
            .expect(403);
    });
});
