const isAdminEmail = require('./isAdminEmail'); // Import your isAdminEmail function

// Middleware to check admin privileges
function checkAdminMiddleWare(req, res, next) {
    const email = req.user.email;

    if (isAdminEmail(email)) {
        next(); // User is an admin, proceed to the next middleware or route handler
    } else {
        res.status(403).send({
            success: false,
            message: "Unauthorized: Only admins can perform this action",
        });
    }
}

module.exports = checkAdminMiddleWare;
