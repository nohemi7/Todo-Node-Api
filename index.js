const express = require('express');

const app = express();
const PORT = 4000;

// Endpoints
app.get('/api/todos', (req, res) => {
    res.status(200).json('message');
});

app.listen(PORT, () => {
    console.log(`Server running on port: http://localhost:${PORT}`);
});