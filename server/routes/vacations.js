const { myQuery } = require('../config');
const { onlyUsers } = require('../helpers/onlyusers');

const router = require('express').Router();

// open to everyone
router.get('/', async (req, res) => {
    try {
        // const s = await myQuery('SELECT * FROM vacations');
        const s = await myQuery(`SELECT vacations.*, favtable.id AS favID FROM vacations LEFT JOIN favtable ON vacations.id = favtable.vacationID AND favtable.userID = ${req.session.user.id} ORDER BY favtable.id DESC`);
        res.send(s);
    } catch (err) {
        console.log(err);
    }
});

// open only to users
router.post('/', async (req, res) => {
    const { vacationID } = req.body;
    const vacationsTable = await myQuery(`SELECT * FROM vacations WHERE id = ${vacationID}`);
    if (!vacationsTable.length) {
        return res.status(400).send({ err: true, msg: "Vacation wasn't found" });
    }
    // await myQuery(`INSERT INTO favtable (userID,vacationID) VALUES (${req.session.user.id},${vacationID})`);
    await myQuery(`UPDATE vacations SET followers = followers + 1 WHERE id = ${vacationID}`);
    res.send({ msg: "the Vacation are all yours, enjoy it" });
    console.log(vacationsTable);
});

router.post('/add', async (req, res) => {
    const { vacationID } = req.body;
    const vacationsTable = await myQuery(`SELECT * FROM vacations WHERE id = ${vacationID}`);
    if (!vacationsTable.length) {
        return res.status(400).send({ err: true, msg: "Vacation wasn't found" });
    }
    await myQuery(`INSERT INTO favtable (userID,vacationID) VALUES (${req.session.user.id},${vacationID})`);
    await myQuery(`UPDATE vacations SET followers = followers + 1 WHERE id = ${vacationID}`);
    res.send({ msg: "the Vacation are all yours, enjoy it" });
});

router.post('/remove', async (req, res) => {
    const { vacationID } = req.body;
    const vacationsTable = await myQuery(`SELECT * FROM vacations WHERE id = ${vacationID}`);
    if (!vacationsTable.length) {
        return res.status(400).send({ err: true, msg: "Vacation wasn't found" });
    }
    await myQuery(`DELETE FROM favtable WHERE favtable.vacationID = ${vacationID} AND favtable.userID = ${req.session.user.id}`);
    await myQuery(`UPDATE vacations SET followers = followers - 1 WHERE id = ${vacationID}`);
    res.send({ msg: "the Vacation are all yours, enjoy it" });
});

// // open only to users
// router.post('/cancel/:showid', onlyUsers, (req, res) => {
//     const { showid } = req.params;
//     // const show = shows.find(s => s.id === showid);
//     const showTable = await myQuery(`DELETE FROM orders WHERE id = ${showid}`);

//     if (!show) {
//         return res.status(400).send({ err: true, msg: "show didn't found" });
//     }
//     show.tickets++;
//     const user = users.find(us => us.username == req.session.user.username);
//     user.orders = user.orders.filter(sw => sw.id !== showid);
//     res.send({ msg: "the money will show up in your account up to 3 days" });
// });




module.exports = router;