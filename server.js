const app = require('./app'); // Adjust the path if your app.js is located differently

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
