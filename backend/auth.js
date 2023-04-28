const jwt = require('jsonwebtoken')

const requireAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, 'secret key for jwt', (err, decodedToken) => {
           if (err) {
            console.log(err.message);
            res.status(404).send({error: 'Not signed in'});
           } else {
            console.log(decodedToken)
            next();
           }
        })
    } else {
        res.status(404).send({error: 'Not signed in'});
    }
}

module.exports = { requireAuth };