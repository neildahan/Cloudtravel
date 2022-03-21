const { myQuery } = require('../config');
const { allLoggedUsers } = require('../helpers/allLoggedUser');

const router = require('express').Router();

// open to everyone
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send({ err: true, msg: "missing username or password" });
    }

    // const user = users.find(us => us.username == username && us.password == password)
    const userTable = await myQuery(`SELECT * from users WHERE username = '${username}' AND password = '${password}'`);

    if (!userTable.length) {
        return res.status(401).send({ err: true, msg: "incorrect username or password" });
    }

    req.session.user = { username, role: userTable[0].role ,id: userTable[0].id};

    res.send({ msg: "you logged in successfully", username, role: userTable[0].role });
});

// open to everyone
router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, username, password } = req.body;

        if (!firstName || !lastName || !username || !password) {
            return res.status(400).send({ err: true, msg: "missing username or password" });
        }

        await myQuery(`INSERT INTO users(firstName,lastName,username, password) values("${firstName}","${lastName}","${username}","${password}")`);

        res.status(201).send({ msg: "user added successfully" });
    } catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
});

// open to all registered users
router.delete('/logout', (req, res) => {
    req.session.destroy();
    res.send({ msg: "disconnected successfully" });
});


module.exports = router;