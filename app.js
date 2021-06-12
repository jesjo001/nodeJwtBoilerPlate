const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req, res) => {
    res.json({
        message: 'welcome to the api'
    })
});

app.post('/api/post', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403)
        } else {
            res.json({
                message: 'Post Created',
                authData
            })
        }
    })
});

app.post('/api/login', (req, res) => {
    //Mock user 
    const user = {
        _id: 1,
        username: 'brad',
        email: 'brade@gmail.com'
    }

    jwt.sign({ user: user }, 'secretkey', { expiresIn: '30s' }, (err, token) => {
        res.json({
            token
        })
    });
})



function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    //check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {

        //split at the space 
        const bearer = bearerHeader.split(' ')
        //get token from array
        const bearerToken = bearer[1]
        //SET THE TOKEN
        req.token = bearerToken

        //NEXT middleware
        next()
    } else {
        //forbiden
        res.sendStatus(403);
    }
}
app.listen(5000, () => console.log("server started on port 5000"))