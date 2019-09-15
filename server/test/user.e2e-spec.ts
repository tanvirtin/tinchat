import * as request from 'supertest';
import * as faker from 'faker';
import * as assert from 'assert';

const app = 'http://localhost:4000';

const userResponseValidation = body => {
    assert.equal('id' in body, true);
    assert.equal('createdDate' in body, true);
    assert.equal('email' in body, true);
    assert.equal('firstName' in body, true);
    assert.equal('lastName' in body, true);
    assert.equal('password' in body, false);
};

const authenticationValidation = (res, email) => {
    assert.equal(res.body.email === email, true);
    assert.equal('authorization' in res.header, true);
};

describe('User Module', () => {
    let email;
    let password;
    let token;

    it('Register a user', async () => {
        email = faker.internet.email();
        password = faker.internet.password();
        const res = await request(app)
            .post('/register')
            .send({
                email,
                password,
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
            })
            .expect(201);
        userResponseValidation(res.body);
        authenticationValidation(res, email);
    });

    it('Register a user with invalid email', async () => {
        request(app)
            .post('/register')
            .send({
                email: 'Invalid',
                password:  faker.internet.password(),
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
            })
            .expect(400);
    });

    it('Register a user with invalid data', async () => {
        request(app)
            .post('/register')
            .send({ email })
            .expect(400);
    });

    it('Register a user with duplicate email', async () => {
        request(app)
            .post('/register')
            .send({
                email,
                password,
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
            })
            .expect(400);
    });

    it('Login a user with invalid password', async () => {
        request(app)
            .post('/login')
            .send({
                email,
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
                email,
                password,
            })
            .expect(201);
        userResponseValidation(res.body);
        authenticationValidation(res, email);
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
            .send({ email })
            .set('Authorization', token)
            .expect(201);
    });

    it('Logout without authorization', async () => {
        request(app)
            .post('/logout')
            .send({ email })
            .expect(403);
    });
});
