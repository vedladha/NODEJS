const jwt = require('jsonwebtoken');
function authenticateToken(req, res, next) {
    const token = req.cookies.jwt;
    if (!token){
    return res.status(401).json({ error: 'Access denied' });
    }
    try {
    const decoded = jwt.verify(token, 'kkre#hrtstr32#1');
    req.userId = decoded.userId;
    next();
    }  catch (error) {
        console.log(error)
    res.status(401).json({ error: 'Invalid token' });
    }
 };
 
module.exports = authenticateToken;
