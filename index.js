const express = require('express');
const app = express();
const port = 5000;
const userData = require('./routes/user.service');
const founderData = require('./routes/founder.service');
const checkLogin = require('./routes/login.service');

app.use(express.json())
app.use(express.urlencoded({ extended: false }));

// router of userData services
app.use('/user', userData);

// router of founder data services
app.use('/founder', founderData);

// router of login data services
app.use('/login', checkLogin)

app.all('*', (req, res) => {
    res.status(404).json({ message: 'Data not found!!' });
})

app.listen(port, (err) => {
    if (err) {
        console.log("ERROR>>>", err);
    }
    console.log(`Server is running on ${port}...`);
})