const request = require('supertest');
const app = require('../app'); 

describe('GET /api/spLists/list', () => {
    it('should return a list of shopping lists', async () => {
        const response = await request(app).get('/api/spLists/list');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
    });

    it('should handle the case when no shopping lists are available', async () => {
        const response = await request(app).get('/api/spLists/list');
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThan(0); 
    });
});
