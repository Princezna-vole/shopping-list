const request = require('supertest');
const app = require('../app'); 

describe('GET /api/splists/get/:id', () => {
    it('should return a specific shopping list by valid id', async () => {
        const validId = 100;
        const response = await request(app).get(`/api/splists/get/${validId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('id', validId);
        expect(response.body).toHaveProperty('name');
    });

    it('should return 400 for an invalid ID format', async () => {
        const invalidId = 'abc'; 
        const response = await request(app).get(`/api/splists/get/${invalidId}`);
        expect(response.statusCode).toBe(400);
    });

    it('should return 404 for a non-existent shopping list', async () => {
        const nonExistentId = 999; 
        const response = await request(app).get(`/api/splists/get/${nonExistentId}`);
        expect(response.statusCode).toBe(404);
    });
});
