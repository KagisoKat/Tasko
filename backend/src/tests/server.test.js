const request = require('supertest');
const { app, pool, server } = require('../server');

describe('Tasko API Tests', () => {

    afterAll(async () => {
        await pool.end();
        server.close();
    });

    describe('Health Checks', () => {
        test('GET /health should return 200 OK', async () => {
            const response = await request(app).get('/health');
            expect(response.status).toBe(200);
            expect(response.body.status).toBe('OK');
            expect(response.body).toHaveProperty('timestamp');
            expect(response.body).toHaveProperty('uptime');
        });

        test('GET /db-health should return 200 OK', async () => {
            const response = await request(app).get('/db-health');
            expect(response.status).toBe(200);
            expect(response.body.status).toBe('OK');
            expect(response.body.database).toBe('Connected');
        });
    });

    describe('Task API Endpoints', () => {
        let createdTaskId;

        test('GET /api/tasks should return all tasks', async () => {
            const response = await request(app).get('/api/tasks');
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });

        test('POST /api/tasks should create a new task', async () => {
            const newTask = {
                title: 'Test Task',
                description: 'This is a test task',
                status: 'pending'
            };

            const response = await request(app)
                .post('/api/tasks')
                .send(newTask);

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('id');
            expect(response.body.title).toBe(newTask.title);
            expect(response.body.description).toBe(newTask.description);
            expect(response.body.status).toBe(newTask.status);

            createdTaskId = response.body.id;
        });

        test('POST /api/tasks should fail without title', async () => {
            const invalidTask = {
                description: 'Task without title'
            };

            const response = await request(app)
                .post('/api/tasks')
                .send(invalidTask);

            expect(response.status).toBe(400);
            expect(response.body.error).toBe('Title is required');
        });

        test('GET /api/tasks/:id should return specific task', async () => {
            const response = await request(app).get(`/api/tasks/${createdTaskId}`);
            expect(response.status).toBe(200);
            expect(response.body.id).toBe(createdTaskId);
            expect(response.body).toHaveProperty('title');
        });

        test('PUT /api/tasks/:id should update task', async () => {
            const updatedTask = {
                title: 'Updated Test Task',
                description: 'Updated description',
                status: 'completed'
            };

            const response = await request(app)
                .put(`/api/tasks/${createdTaskId}`)
                .send(updatedTask);

            expect(response.status).toBe(200);
            expect(response.body.title).toBe(updatedTask.title);
            expect(response.body.status).toBe(updatedTask.status);
        });

        test('DELETE /api/tasks/:id should delete task', async () => {
            const response = await request(app).delete(`/api/tasks/${createdTaskId}`);
            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Task deleted successfully');
        });

        test('GET /api/tasks/:id should return 404 for non-existent task', async () => {
            const response = await request(app).get('/api/tasks/999999');
            expect(response.status).toBe(404);
            expect(response.body.error).toBe('Task not found');
        });
    });

    describe('Error Handling', () => {
        test('Should return 404 for unknown routes', async () => {
            const response = await request(app).get('/api/unknown');
            expect(response.status).toBe(404);
            expect(response.body.error).toBe('Route not found');
        });
    });
});
