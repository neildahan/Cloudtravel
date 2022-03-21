module.exports.onlyAdmins = (req, res, next) => {
    if (req.session.user?.role == "admin") {
        next()
    } else {
        res.status(401).send({err:true, msg: "secure content. please log as in an admin to access" })
    }
}


