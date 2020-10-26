const express = require('express')
const app = express()
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
require('./models/intializeDB')

app.use('/user', verifyToken, require('./routes/user.js'))

//to get the authentication token
app.post('/api/getToken', (req, res) => {
    // Mock user
    const user = {
        id: 1,
        username: 'uday',
        email: 'uday@gmail.com'
    }

    jwt.sign({ user }, 'secretkey', { expiresIn: '300000s' }, (err, token) => {
        res.json({
            token
        });
    });
});

//error handling middleware
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

function verifyToken(req, res, next) {
    // FORMAT OF TOKEN
    // Authorization: Bearer <access_token>
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        jwt.verify(req.token, 'secretkey', (err, authData) => {
            if (err) {
                res.sendStatus(403);
            }
            else
                next();
        })
    } else {
        res.sendStatus(403);
    }
}

mongoose
    .connect(
        'mongodb://127.0.0.1:27017/TechActive'
    )
    .then(result => {
        app.listen(8080, console.log("server started listening "));
    })
    .catch(err => console.log(err));
