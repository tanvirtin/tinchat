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

    it('Register a user', async () => {
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

    it('Register a user with invalid data', async () => {
        request(app)
            .post('/register')
            .send({ username })
            .expect(400);
    });

    it('Register a user with duplicate username', async () => {
        request(app)
            .post('/register')
            .send({
                username,
                password,
            })
            .expect(400);
    });

    it('Login a user with invalid password', async () => {
        request(app)
            .post('/login')
            .send({
                username,
                password: 'Invalid Password',
            })
            .expect(400);
    });

    it('Login a user with invalid data', async () => {
        request(app)
            .post('/login')
            .send({ password })
            .expect(400);
    });

    it('Login a user', async () => {
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

    it('Get all users without authorization', async () => {
        request(app)
            .get('/api/users')
            .expect(403);
    });

    it('Logout', async () => {
        request(app)
            .post('/logout')
            .send({ username })
            .set('Authorization', token)
            .expect(201);
    });

    it('Logout without authorization', async () => {
        request(app)
            .post('/logout')
            .send({ username })
            .expect(403);
    });
});
