const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
const jwt = require('jsonwebtoken');

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cors());
mongoose.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});


app.use('/api/users',  require('./routes/users'));
app.use('/api/conferences',  require('./routes/conferences'));
app.use('/api/feedbacks', require('./routes/feedbacks'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('server Running on port', PORT);
})