const request = require('supertest');
const app = require('../app'); 

describe('POST /api/spLists/create', () => {
    it('should create a new shopping list', async () => {
        const newListData = { name: "New Shopping List" };
        const response = await request(app)
            .post('/api/spLists/create')
            .send(newListData);

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('name', newListData.name);
    });

    it('should return 400 for invalid data', async () => {
        const invalidListData = {};
        const response = await request(app)
            .post('/api/spLists/create')
            .send(invalidListData);

        expect(response.statusCode).toBe(400);
    });
});
