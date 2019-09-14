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

const authenticationValidation = (body, username, token = false) => {
    assert.equal(body.username === username, true);
    assert.equal('token' in body, true);
    if (token) {
        assert.equal(body.token, token);
    }
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
        authenticationValidation(res.body, username);
        token = res.body.token;
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
        authenticationValidation(res.body, username, token);
    });

    it('Get all users', async () => {
        const res = await request(app)
            .get('/api/users')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
        res.body.forEach(userResponseValidation);
    });
});
