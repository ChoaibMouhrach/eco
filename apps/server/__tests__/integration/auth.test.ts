import { config } from '../../src/config/config';
import makeApp from '../../src/app';
import request from 'supertest';
import User from '../../src/models/User';
import { userPayload } from '../../src/common/constants';
import { hashSync } from 'bcrypt';
import { parse } from '../../src/utils/cookies';
import jwt from 'jsonwebtoken';

const makeUser = () => {
  const password = hashSync(userPayload.password, Number(config.SALT));
  return {
    ...userPayload,
    password,
    password_confirmation: password,
  };
};

/* mock sending emails */
jest.mock('../../src/utils/email', () => ({
  sendMail: () => Promise.resolve(),
}));

beforeEach(async () => {
  await User.deleteMany({});
  jest.clearAllMocks();
});

afterEach(async () => {
  await User.deleteMany({});
});

describe('POST /login', () => {
  it('Should return 400 with email required', async () => {
    const response = await request(await makeApp())
      .post('/login')
      .send({
        password: 'password',
      });

    expect(response.status).toBe(400);
    expect(response.body?.statusCode).toBe(400);
    expect(response.body?.message).toMatchObject([{ message: 'Required', path: ['email'] }]);
    expect(response.body?.error).toBe('Bad Request');
  });

  it('Should return 200 with user info', async () => {
    const user = new User(makeUser());
    await user.save();

    const response = await request(await makeApp())
      .post('/login')
      .set('Content-Type', 'application/json')
      .send({
        email: userPayload.email,
        password: 'password',
      });

    expect(response.status).toBe(200);
    expect(response.body?.firstName).toBe(user.firstName);
    expect(response.body?.lastName).toBe(user.lastName);
    expect(response.body?.email).toBe(user.email);

    const rawCookies = response.headers['set-cookie'] as string[] | undefined;
    expect(rawCookies).toBeDefined();

    const cookies = parse(rawCookies ?? []);
    expect(cookies.accessToken).toBeDefined();
    expect(cookies.refreshToken).toBeDefined();
  });

  it('Should return 400 with password required', async () => {
    const user = new User(makeUser());
    await user.save();

    const response = await request(await makeApp())
      .post('/login')
      .send({
        email: userPayload.email,
      });

    expect(response.status).toBe(400);
    expect(response.body?.statusCode).toBe(400);
    expect(response.body?.message).toMatchObject([{ message: 'Required', path: ['password'] }]);
    expect(response.body?.error).toBe('Bad Request');
  });

  it('Should return 400 with Email Address does not exists', async () => {
    const response = await request(await makeApp())
      .post('/login')
      .send({
        email: userPayload.email,
        password: 'password',
      });

    expect(response.status).toBe(400);
    expect(response.body?.statusCode).toBe(400);
    expect(response.body?.message).toMatchObject([
      { message: 'Email Address does not exists', path: ['email'] },
    ]);
    expect(response.body?.error).toBe('Bad Request');
  });

  it('Should return 400 with Email Address does not exists and password required', async () => {
    const response = await request(await makeApp())
      .post('/login')
      .send({
        email: userPayload.email,
      });

    expect(response.status).toBe(400);
    expect(response.body?.statusCode).toBe(400);
    expect(response.body?.message).toMatchObject([
      { message: 'Required', path: ['password'] },
      { message: 'Email Address does not exists', path: ['email'] },
    ]);
    expect(response.body?.error).toBe('Bad Request');
  });
});

describe('POST /register', () => {
  it('Should return 200 with user', async () => {
    const response = await request(await makeApp())
      .post('/register')
      .send(makeUser());

    expect(response.status).toBe(201);
    expect(response.body?.firstName).toBe(userPayload.firstName);
    expect(response.body?.lastName).toBe(userPayload.lastName);
    expect(response.body?.email).toBe(userPayload.email);

    const rawCookies = response.headers['set-cookie'] as string[] | undefined;
    expect(rawCookies).toBeDefined();

    const cookies = parse(rawCookies ?? []);
    expect(cookies.accessToken).toBeDefined();
    expect(cookies.refreshToken).toBeDefined();
  });

  it('Should return 400 with Email Address is already taken', async () => {
    const user = new User(makeUser());
    await user.save();

    const response = await request(await makeApp())
      .post('/register')
      .send({
        ...userPayload,
        password_confirmation: userPayload.password,
      });

    expect(response.status).toBe(400);
    expect(response.body?.statusCode).toBe(400);
    expect(response.body?.message).toMatchObject([
      {
        path: ['email'],
        message: 'Email Address is already taken',
      },
    ]);
    expect(response.body?.error).toBe('Bad Request');
  });

  it('Should return 400 with Required', async () => {
    const response = await request(await makeApp()).post('/register');

    expect(response.status).toBe(400);
    expect(response.body?.statusCode).toBe(400);

    expect(response.body?.message).toMatchObject([
      {
        path: ['firstName'],
        message: 'Required',
      },
      {
        path: ['lastName'],
        message: 'Required',
      },
      {
        path: ['email'],
        message: 'Required',
      },
      {
        path: ['birthDay'],
        message: 'Required',
      },
      {
        path: ['address'],
        message: 'Required',
      },
      {
        path: ['gender'],
        message: 'Required',
      },
      {
        path: ['phone'],
        message: 'Required',
      },
      {
        path: ['password'],
        message: 'Required',
      },
      {
        path: ['password_confirmation'],
        message: 'Required',
      },
    ]);

    expect(response.body?.error).toBe('Bad Request');
  });
});

describe('POST /logout', () => {
  it('Should return 204', async () => {
    const user = new User(makeUser());

    const refreshToken = jwt.sign({ _id: user._id }, config.REFRESH_SECRET);

    user.refreshTokens.push({
      token: refreshToken,
      createdAt: new Date(),
    });

    await user.save();

    const response = await request(await makeApp())
      .post('/logout')
      .set('Authorization', `Bearer ${refreshToken}`);

    expect(response.status).toBe(204);
  });

  it('Should return 401 with unauthorized because of the missing token', async () => {
    const response = await request(await makeApp()).post('/logout');

    expect(response.status).toBe(401);
    expect(response.body.statusCode).toBe(401);
    expect(response.body.message).toBe('unauthorized');
    expect(response.body.error).toBe('Unauthorized');
  });

  it('Should return 401 with unauthorized because of the fake token', async () => {
    const response = await request(await makeApp())
      .post('/logout')
      .set('Authorization', `Bearer ${345}`);

    expect(response.status).toBe(401);
    expect(response.body.statusCode).toBe(401);
    expect(response.body.message).toBe('unauthorized');
    expect(response.body.error).toBe('Unauthorized');
  });

  it('Should return 401 with unauthorized because of the token that does not exists in the user issued tokens', async () => {
    const user = new User(makeUser());

    const refreshToken = jwt.sign({ _id: user._id }, config.REFRESH_SECRET);

    await user.save();

    const response = await request(await makeApp())
      .post('/logout')
      .set('Authorization', `Bearer ${refreshToken}`);

    expect(response.status).toBe(404);
    expect(response.body.statusCode).toBe(404);
    expect(response.body.message).toBe('User does not exists');
    expect(response.body.error).toBe('Not Found');
  });
});

describe('POST /refresh', () => {
  it('Should return 200 with accessToken and refreshToken', async () => {
    const user = new User(makeUser());

    const refreshToken = jwt.sign({ _id: user._id }, config.REFRESH_SECRET);

    user.refreshTokens.push({
      token: refreshToken,
      createdAt: new Date(),
    });

    await user.save();

    const response = await request(await makeApp())
      .post('/refresh')
      .set('Authorization', `Bearer ${refreshToken}`);

    expect(response.status).toBe(200);
    expect(response.body?.accessToken).toBeDefined();
    expect(response.body?.refreshToken).toBeDefined();
  });
});

describe('GET /me', () => {
  it('Should return 200 with user', async () => {
    const user = new User(makeUser());

    const accessToken = jwt.sign({ _id: user._id }, config.ACCESS_SECRET);

    await user.save();

    const response = await request(await makeApp())
      .get('/me')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.status).toBe(200);
    expect(response.body?.firstName).toBe(user.firstName);
    expect(response.body?.lastName).toBe(user.lastName);
    expect(response.body?.email).toBe(user.email);
  });
});

describe('POST /forgot-password', () => {
  it('Should return 200 with If the email address exists within our database an email will be sent to it ( user exists ) ', async () => {
    const user = new User(makeUser());
    await user.save();

    const response = await request(await makeApp())
      .post('/forgot-password')
      .send({ email: user.email });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe(
      'If the email address exists within our database an email will be sent to it',
    );
  });

  it('Should return 200 with If the email address exists within our database an email will be sent to it ( user does not exists ) ', async () => {
    const response = await request(await makeApp())
      .post('/forgot-password')
      .send({ email: userPayload.email });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe(
      'If the email address exists within our database an email will be sent to it',
    );
  });

  it('Should return 400 with email required', async () => {
    const response = await request(await makeApp()).post('/forgot-password');

    expect(response.status).toBe(400);
    expect(response.body?.statusCode).toBe(400);
    expect(response.body?.message).toMatchObject([{ message: 'Required', path: ['email'] }]);
    expect(response.body?.error).toBe('Bad Request');
  });
});

describe('POST /reset-password', () => {
  it('Should return 204', async () => {
    const user = new User(makeUser());

    const token = jwt.sign({ _id: user.id }, config.FORGOT_PASSWORD_SECRET);
    user.forgotPasswordTokens.push({
      token,
      createdAt: new Date(),
    });

    await user.save();

    const response = await request(await makeApp())
      .post(`/reset-password/${token}`)
      .send({ password: 'password', password_confirmation: 'password' });

    expect(response.status).toBe(204);
  });

  it('Should return 400 with password Required', async () => {
    const user = new User(makeUser());

    const token = jwt.sign({ _id: user.id }, config.FORGOT_PASSWORD_SECRET);
    user.forgotPasswordTokens.push({
      token,
      createdAt: new Date(),
    });

    await user.save();

    const response = await request(await makeApp()).post(`/reset-password/${token}`);

    expect(response.status).toBe(400);
    expect(response.body?.statusCode).toBe(400);
    expect(response.body?.message).toMatchObject([
      { path: ['password'], message: 'Required' },
      { path: ['password_confirmation'], message: 'Required' },
    ]);
    expect(response.body?.error).toBe('Bad Request');
  });

  it('Should return 404 with user not found', async () => {
    const user = new User(makeUser());

    const token = jwt.sign({ _id: user.id }, config.FORGOT_PASSWORD_SECRET);

    const response = await request(await makeApp())
      .post(`/reset-password/${token}`)
      .send({ password: 'password', password_confirmation: 'password' });

    expect(response.status).toBe(404);
    expect(response.body?.statusCode).toBe(404);
    expect(response.body?.message).toBe('User not found');
    expect(response.body?.error).toBe('Not Found');
  });

  it('Should return 400 with Token invalid', async () => {
    const response = await request(await makeApp())
      .post(`/reset-password/2456`)
      .send({ password: 'password', password_confirmation: 'password' });

    expect(response.status).toBe(400);
    expect(response.body?.statusCode).toBe(400);
    expect(response.body?.message).toBe('Token is invalid');
    expect(response.body?.error).toBe('Invalid Token');
  });
});

describe('POST /send-confirmation-email', () => {
  it('Should return 204', async () => {
    const user = new User(makeUser());

    const token = jwt.sign({ _id: user.id }, config.ACCESS_SECRET);

    await user.save();

    const response = await request(await makeApp())
      .post('/send-confirmation-email')
      .set('Authorization', `Bearer ${token}`)
      .send({ email: user.email });

    expect(response.status).toBe(204);
  });

  it('Should return 400 with Email Address is already verified', async () => {
    const user = new User(makeUser());
    user.verifiedAt = new Date();

    const token = jwt.sign({ _id: user.id }, config.ACCESS_SECRET);
    await user.save();

    const response = await request(await makeApp())
      .post('/send-confirmation-email')
      .set('Authorization', `Bearer ${token}`)
      .send({ email: user.email });

    expect(response.status).toBe(400);
    expect(response.body?.statusCode).toBe(400);
    expect(response.body?.message).toBe('Email Address is already verified');
    expect(response.body?.error).toBe('Bad Request');
  });
});

describe('POST /confirm-email', () => {
  it('Should return 204', async () => {
    const user = new User(makeUser());

    const token = jwt.sign({ _id: user.id }, config.CONFIRM_EMAIL_SECRET);

    user.confirmEmailTokens.push({
      token,
      createdAt: new Date(),
    });

    await user.save();

    const response = await request(await makeApp()).post(`/confirm-email/${token}`);

    expect(response.status).toBe(204);
  });

  it('Should return 400 with token invalid', async () => {
    const response = await request(await makeApp()).post('/confirm-email/23454');

    expect(response.status).toBe(400);
    expect(response.body?.statusCode).toBe(400);
    expect(response.body?.message).toBe('Token is invalid');
    expect(response.body?.error).toBe('Bad Request');
  });

  it('Should return 404 with user not found', async () => {
    const user = new User(makeUser());

    const token = jwt.sign({ _id: user.id }, config.CONFIRM_EMAIL_SECRET);

    const response = await request(await makeApp()).post(`/confirm-email/${token}`);

    expect(response.status).toBe(404);
    expect(response.body?.statusCode).toBe(404);
    expect(response.body?.message).toBe('User Not Found');
    expect(response.body?.error).toBe('Not Found');
  });

  it('Should return 400 with Email address is already verified', async () => {
    const user = new User(makeUser());

    user.verifiedAt = new Date();
    const token = jwt.sign({ _id: user.id }, config.CONFIRM_EMAIL_SECRET);

    await user.save();

    const response = await request(await makeApp()).post(`/confirm-email/${token}`);

    expect(response.status).toBe(400);
    expect(response.body?.statusCode).toBe(400);
    expect(response.body?.message).toBe('Email Address is already verified');
    expect(response.body?.error).toBe('Bad Request');
  });
});

describe('PATCH /me', () => {
  it('Should return 200 with user', async () => {
    const user = new User(makeUser());
    const token = jwt.sign({ _id: user.id }, config.ACCESS_SECRET);
    await user.save();

    const response = await request(await makeApp())
      .patch('/me')
      .set('Authorization', `Bearer ${token}`)
      .send({ password: userPayload.password, name: 'johny' });

    expect(response.status).toBe(200);

    expect(response.body?.firstName).toBe(userPayload.firstName);
    expect(response.body?.lastName).toBe(userPayload.lastName);
    expect(response.body?.email).toBe(userPayload.email);
  });

  it('Should return 400 with password is not correct', async () => {
    const user = new User(makeUser());
    const token = jwt.sign({ _id: user.id }, config.ACCESS_SECRET);
    await user.save();

    const response = await request(await makeApp())
      .patch('/me')
      .set('Authorization', `Bearer ${token}`)
      .send({ password: 'password100', name: 'johny' });

    expect(response.status).toBe(400);

    expect(response.body?.statusCode).toBe(400);
    expect(response.body?.message).toBe('Password is not correct');
    expect(response.body?.error).toBe('Bad Request');
  });

  it('Should return 400 with Email Address is already taken', async () => {
    const user = new User(makeUser());
    const token = jwt.sign({ _id: user.id }, config.ACCESS_SECRET);
    await user.save();

    const response = await request(await makeApp())
      .patch('/me')
      .set('Authorization', `Bearer ${token}`)
      .send({ password: 'password100', email: userPayload.email });

    expect(response.status).toBe(400);

    expect(response.body?.statusCode).toBe(400);
    expect(response.body?.message).toMatchObject([
      { message: 'Email Address is already taken', path: ['email'] },
    ]);
    expect(response.body?.error).toBe('Bad Request');
  });
});

describe('POST /change-password', () => {
  it('Should return 204', async () => {
    const user = new User(makeUser());

    const token = jwt.sign({ _id: user.id }, config.ACCESS_SECRET);

    await user.save();

    const response = await request(await makeApp())
      .post('/change-password')
      .set('Authorization', `Bearer ${token}`)
      .send({
        old_password: userPayload.password,
        password: userPayload.password + 10,
        password_confirmation: userPayload.password + 10,
      });

    expect(response.status).toBe(204);
  });

  it('Should return 400', async () => {
    const user = new User(makeUser());

    const token = jwt.sign({ _id: user.id }, config.ACCESS_SECRET);

    await user.save();

    const response = await request(await makeApp())
      .post('/change-password')
      .set('Authorization', `Bearer ${token}`)
      .send({
        old_password: userPayload.password + 10,
        password: userPayload.password + 10,
        password_confirmation: userPayload.password + 10,
      });

    expect(response.status).toBe(400);
    expect(response.body?.statusCode).toBe(400);
    expect(response.body?.message).toMatchObject([
      { message: 'Old Password is not correct', path: ['old_password'] },
    ]);
    expect(response.body?.error).toBe('Bad Request');
  });
});

describe('DELETE /me', () => {
  it('Should return 204', async () => {
    const user = new User(makeUser());
    const token = jwt.sign({ _id: user.id }, config.ACCESS_SECRET);
    await user.save();

    const response = await request(await makeApp())
      .delete('/me')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(204);
  });
});
