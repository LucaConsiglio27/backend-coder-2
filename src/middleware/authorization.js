// src/middleware/authorization.js
function authorizeAdmin(req, res, next) {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Access denied. Admins only.' });
    }
    next();
}

function authorizeUser(req, res, next) {
    if (req.user.role !== 'user') {
        return res.status(403).json({ error: 'Access denied. Users only.' });
    }
    next();
}

module.exports = { authorizeAdmin, authorizeUser };
