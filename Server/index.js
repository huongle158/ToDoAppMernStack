require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const taskRoute = require('./routers/task');


const app = express();

const PORT = process.env.PORT || 8080;
const URI = process.env.DATABASE_URL;

app.use(cors());
app.use(morgan("common"));
// app.use(bodyParser());
app.use(bodyParser.json({limit:'50mb'}));

app.get('/', (req, res) => {
    // res.send('Hello Huongle')
    res.status(200).json("HomePage");
})


// CONNECT DATABASE
mongoose.connect(URI, () => {
    console.log('Connected to DB');

})

// ROUTES
app.use('/tasks', taskRoute)


app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    // await mongoose.connect('mongodb://localhost:27017/test');
});

