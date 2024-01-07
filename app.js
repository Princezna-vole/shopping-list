const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Mock data
let spLists = [
    {
        id: 100,
        name: "Shopping List 1",
        things: [
            { id: "429x966b-7182-403d-da01-c58a46d165a9", name: "Test: 3 Unicorns", completed: false },
            { id: "129ydki0-1780-07i0-da01-0oa042d1659c", name: "pineapple", completed: true },
        ],
        users: [
            { id: 1, name: 'Owner', isOwner: true },
            { id: 2, name: 'User 1', isOwner: false },
        ],
    },
    {
        id: 101,
        name: "Shopping List 2",
        things: [
            { id: "389a123c-7267-033m-be02-c59a76f165i0", name: "Test: Liquid Chalk", completed: true },
            { id: "9ba1czt0-07bv-3mi9-e02b-09ia765ih0k3", name: "Test: Liquid Chalk", completed: true },
        ],
        users: [
            { id: 1, name: 'Owner', isOwner: true },
            { id: 3, name: 'User 2', isOwner: false },
        ],
    }
];

let things = [
    { id: "429x966b-7182-403d-da01-c58a46d165a9", name: "Test: 3 Unicorns", completed: false },
    { id: "389a123c-7267-033m-be02-c59a76f165i0", name: "Test: Liquid Chalk", completed: true },
];

let users = [
    { id: 1, name: 'Owner', isOwner: true },
    { id: 2, name: 'User 1', isOwner: false },
    { id: 3, name: 'User 2', isOwner: false },
];

function validateFields(req, res, requiredFields) {
    for (const field of requiredFields) {
        if (!req.body[field]) {
            res.status(400).send(`Error: '${field}' is required.`);
            return false;
        }
    }
    return true;
}

let currentSpListId = 102;

// Define your endpoints
// Shopping List Endpoints
app.post('/api/spLists/create', (req, res) => {
    if (!validateFields(req, res, ['name'])) return;
    try {
      currentSpListId++;
      const newList = { id: currentSpListId, name: req.body.name };
      spLists.push(newList);
      res.status(201).json(newList);
    } catch (error) {
      res.status(500).send('Internal Server Error');
    }
  });

  app.get('/api/spLists/list', (req, res) => {
    if (spLists.length === 0) {
        res.status(404).send('No shopping lists found');
        return;
    }
    const simplifiedSpLists = spLists.map(list => ({
        id: list.id,
        name: list.name
    }));
    res.status(200).json(simplifiedSpLists);
});

app.get('/api/splists/get/:id', (req, res) => {
    const listId = parseInt(req.params.id);
    if (isNaN(listId) || listId < 100) {
        res.status(400).send('Invalid ID provided');
        return;
    }
    const spList = spLists.find(list => list.id === listId);
    if (!spList) {
        res.status(404).send(`Shopping list with ID ${listId} not found.`);
        return;
    }
    res.status(200).json(spList);
});

// Things (Items) Endpoints
app.post('/api/things/create', (req, res) => {
    if (!req.body.name) {
        res.status(400).json({ warning: "Name is required to create a new item." });
        return;
    }
    const newThingId = `thing-${currentThingId++}`;
    const newThing = { id: newThingId, ...req.body };
    things.push(newThing);
    res.status(201).json(newThing);
});

app.get('/api/things/list', (req, res) => {
    if (things.length === 0) {
        res.status(404).send('No items found');
        return;
    }
    res.status(200).json(things);
});

app.put('/api/things/update/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    if (typeof name !== 'string' || name.trim() === '') {
        res.status(400).send('Name is required to update the item');
        return;
    }

    const itemIndex = things.findIndex(item => item.id === id);
    if (itemIndex !== -1) {
        things[itemIndex].name = name; 
        res.status(200).json(things[itemIndex]);
    } else {
        res.status(404).send('Item not found');
    }
});

app.delete('/api/things/delete/:id', (req, res) => {
    const { id } = req.params;
    const itemIndex = things.findIndex(item => item.id === id);
    if (itemIndex !== -1) {
        things.splice(itemIndex, 1);
        res.status(200).send(`Item with id ${id} deleted`);
    } else {
        res.status(404).send('Item not found/deleted');
    }
});

// User Endpoints
app.post('/api/users/create', (req, res) => {
    try {
        const newUser = { id: users.length + 1, ...req.body };
        users.push(newUser);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).send("Error occurred, user was not added");
    }
});

app.get('/api/users/get', (req, res) => {
    if (users.length === 0) {
        res.status(404).send('No users found');
        return;
    }
    res.status(200).json(users);
});

app.delete('/api/users/delete/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex > -1) {
        users.splice(userIndex, 1);
        res.status(200).send('User deleted');
    } else {
        res.status(404).send('User not found');
    }
});

module.exports = app;
