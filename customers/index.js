const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const customerRoutes = require('./customerRoutes');

// creating our express app
const app = express();

// middleware
app.use(bodyParser.json());

app.use('/', customerRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});