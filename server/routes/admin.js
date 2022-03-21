const { onlyAdmins } = require('../helpers/onlyAdmins');
const { myQuery } = require('../config');

const router = require('express').Router();

router.use(onlyAdmins);

router.post('/new', async (req, res) => {
    const { destination, imgUrl, description, fromDate, toDate, price } = req.body;

    if (!destination || !imgUrl || !description || !fromDate || !toDate || !price) {
        return res.status(400).send({ err: true, msg: "missing some info" });
    }
    await myQuery(`INSERT INTO vacations (destination, imgUrl, description, fromDate, toDate, price) VALUES ('${destination}','${imgUrl}','${description}','${fromDate}','${toDate}',${price})`);
    res.send({ msg: "vacation added successfully" });
});

router.post('/delete/:vacationID', async (req, res) => {
    const { vacationID } = req.params;
    await myQuery(`DELETE FROM vacations WHERE id = ${vacationID}`);
    console.log(myQuery);
    res.send({ msg: "vacation deleted successfully" });
});

router.get('/edit/:vacationID', async (req, res) => {
    const { vacationID } = req.params;

    await myQuery(`SELECT * FROM vacations WHERE id = ${vacationID}`, (err, result) => {

    });
    res.send(myQuery);
});

router.put('/edit/:vacationID', async (req, res) => {
    const { vacationID } = req.params;
    const { destination, imgUrl, description, fromDate, toDate, price } = req.body;
    if (!destination || !imgUrl || !description || !fromDate || !toDate || !price) {
        return res.status(400).send({ err: true, msg: "missing some info" });
    }
   const vacation = await myQuery(`UPDATE vacations set destination = '${destination}', imgUrl = '${imgUrl}', description = '${description}', fromDate = '${fromDate}', toDate = '${toDate}', price = ${price} WHERE id =${vacationID}`)
    res.send({ msg: "vacation updated successfully" });
});


module.exports = router;