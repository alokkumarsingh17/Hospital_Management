const express = require('express');
const path = require('path');
const app = express();

// Serve frontend build
app.use(express.static(path.join(__dirname, '../Frontend/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../Frontend/build', 'index.html'));
});
