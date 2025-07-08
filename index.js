// Random JavaScript code for testing
const express = require('express');
const app = express();
const port = 3000;

// Middleware for parsing JSON
app.use(express.json());

// Sample data
const users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com' }
];

// Helper function to generate random numbers
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Route to get all users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// Route to get a specific user
app.get('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  res.json(user);
});

// Route to create a new user
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  
  const newUser = {
    id: users.length + 1,
    name,
    email
  };
  
  users.push(newUser);
  res.status(201).json(newUser);
});

// Route to get random data
app.get('/api/random', (req, res) => {
  const randomData = {
    number: getRandomNumber(1, 100),
    timestamp: new Date().toISOString(),
    randomString: Math.random().toString(36).substring(2, 15),
    booleanValue: Math.random() > 0.5,
    array: Array.from({ length: 5 }, () => getRandomNumber(1, 10))
  };
  
  res.json(randomData);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log('Available endpoints:');
  console.log('- GET /api/users - Get all users');
  console.log('- GET /api/users/:id - Get specific user');
  console.log('- POST /api/users - Create new user');
  console.log('- GET /api/random - Get random data');
});

// Export for testing
module.exports = app;
