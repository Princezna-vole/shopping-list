const request = require('supertest');
const app = require('../app'); // Adjust the path to the location of your app.js

describe('PUT /api/things/update/:id', () => {
    it('should update an existing item', async () => {
        const validId = "429x966b-7182-403d-da01-c58a46d165a9"; // Replace with an ID that exists in your test data
        const newName = "Updated Item Name";
        const response = await request(app)
            .put(`/api/things/update/${validId}`)
            .send({ name: newName });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('id', validId);
        expect(response.body).toHaveProperty('name', newName);
    });

    it('should return 400 for invalid data', async () => {
        const validId = "429x966b-7182-403d-da01-c58a46d165a9"; // Use a valid ID
        const response = await request(app)
            .put(`/api/things/update/${validId}`)
            .send({ name: '' }); 
        expect(response.statusCode).toBe(400);
    });

    it('should return 404 for a non-existent item', async () => {
        const nonExistentId = "non-existent-id"; 
        const response = await request(app)
            .put(`/api/things/update/${nonExistentId}`)
            .send({ name: 'Some Name' });

        expect(response.statusCode).toBe(404);
    });
});
