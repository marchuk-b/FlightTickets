const jwt = require('jsonwebtoken');
module.exports = function (roles) {
    return function (req, res, next) {
        if (req.method === 'OPTIONS') {
                next();
            }
        try {
            const token = req.cookies?.token || // спроба витягнути з cookie
                req.headers.authorization?.split(' ')[1]; // або з Authorization

            if (!token) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            const {roles: userRoles} = jwt.verify(token, process.env.JWT_SECRET);

            let hasRole = false;
            userRoles.forEach(role => {
                if (roles.includes(role)) {
                    hasRole = true;
                }
            });
            if (!hasRole) {
                return res.status(403).json({ message: 'You do not have access' });
            }
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    };

}