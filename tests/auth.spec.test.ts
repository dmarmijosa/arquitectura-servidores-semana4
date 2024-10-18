import request from 'supertest';
import app from '../app';
import mongoose from 'mongoose';

beforeAll(async () => {
  const uri = 'mongodb://localhost:27017/posts-api-test';
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('Authentication API', () => {
  let token: string;

  it('should register a new user', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ name: 'Test User', email: 'testuser@example.com', password: 'password123', bio: 'This is a test user' });
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('User registered successfully');
  });

  it('should login the user and return a token', async () => {
    const response = await request(app)
      .post('/api/users/login')
      .send({ email: 'testuser@example.com', password: 'password123' });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    token = response.body.token;
  });

  it('should return 401 for accessing posts without authentication', async () => {
    const response = await request(app).get('/api/posts');
    expect(response.status).toBe(401);
  });

  it('should allow authenticated user to access posts', async () => {
    const response = await request(app)
      .get('/api/posts')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
});
