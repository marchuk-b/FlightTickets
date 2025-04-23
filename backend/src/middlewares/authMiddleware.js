const jwt = require('jsonwebtoken');
module.exports = function (req, res, next) {
    if (req.method === 'OPTIONS') {
        return next();
    }
    try {
        const token = req.cookies?.token || // спроба витягнути з cookie
            req.headers.authorization?.split(' ')[1]; // або з Authorization

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};
