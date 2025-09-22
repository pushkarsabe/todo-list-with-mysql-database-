// require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const sequelize = require('./util/database');

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const todoRoute = require('./routes/todo');

app.use("/", (req, res) => {
    const filepath = path.join(__dirname, 'Frontend', 'todo.html');
    res.sendFile(filepath);
});

app.use("/todo", todoRoute);

sequelize.sync()
    .then(result => {
        app.listen(process.env.PORT || 3000);
    })
    .catch(err => {
        console.log(err);
    })

