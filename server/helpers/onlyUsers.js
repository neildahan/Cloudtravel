module.exports.onlyUsers = (req, res, next) => {
    // if (req.session.user && req.session.user.role == "user") {
    if (req.session.user?.role == "user") {
        next()
    } else {
        res.status(401).send({err:true, msg: "secure content. please log as in a user to access" })
    }
}