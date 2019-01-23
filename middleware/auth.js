const { TokenPrefix } = require("../config/keys");

const authRequired = (req, res, next) => {
    const bearerHeader = req.headers["authorization"];


    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");

        if (bearer[0] !== TokenPrefix) {
            res.sendStatus(401);
        } else {
            const bearerToken = bearer[1];

            req.token = bearerToken;
            next();
        }
    } else {
        res.sendStatus(401);
    }

}

module.exports = { authRequired };