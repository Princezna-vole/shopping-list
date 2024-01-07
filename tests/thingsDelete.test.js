const request = require('supertest');
const app = require('../app'); 

describe('DELETE /api/things/delete/:id', () => {
    it('should delete an existing item', async () => {
        const validId = "429x966b-7182-403d-da01-c58a46d165a9"; 
        const response = await request(app).delete(`/api/things/delete/${validId}`);
        expect(response.statusCode).toBe(200);
        expect(response.text).toEqual(`Item with id ${validId} deleted`);
    });

    it('should return 404 for a non-existent item', async () => {
        const nonExistentId = "non-existent-id"; 
        const response = await request(app).delete(`/api/things/delete/${nonExistentId}`);
        expect(response.statusCode).toBe(404);
    });
});
