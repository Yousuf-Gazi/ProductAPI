const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./productRoutes');

const app =express();
app.use(bodyParser.json());
app.use('/', productRoutes);

const PORT = 4000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});