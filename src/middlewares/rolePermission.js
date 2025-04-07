const Role = require('../models/roleModel');

const checkPermission = async (req, res, next) => {
    const userRole = req.user.role;  // Extract role from the user
    let requestedRoute = req.originalUrl.split('?')[0];  // Remove query parameters if present
    const requestedMethod = req.method.toLowerCase();  // Get the HTTP method in lowercase
    let action;

    // Map HTTP methods to action names
    if (requestedMethod === 'get') {
        action = 'read';
    } else if (requestedMethod === 'post') {
        action = 'create';
    } else if (requestedMethod === 'put') {
        action = 'update';
    } else if (requestedMethod === 'delete') {
        action = 'delete';
    }

    try {
        // Fetch the role from the database
        const role = await Role.findOne({ name: userRole });

        // Check if the role exists
        if (!role) {
            return res.status(403).json({ error: "Access denied! Role not found." });
        }

        // Strip out the '/api' prefix and dynamically remove the user ID or any dynamic part from the URL
        requestedRoute = requestedRoute.replace(/^\/api/, '');  // Remove /api prefix
        const routeParts = requestedRoute.split('/');  // Split by "/"

        // Only keep the first part of the route (i.e., /users from /users/67b1933294081c84d40dd376)
        requestedRoute = `/${routeParts[1]}`;


        // Check if the route exists in permissions and contains the action
        if (!role.permissions.has(requestedRoute)) {
            return res.status(403).json({ error: "Access denied! Route not found in permissions" });
        }

        // Check if the action is in the permissions for the route
        const permissionsForRoute = role.permissions.get(requestedRoute);
        if (!permissionsForRoute.includes(action)) {
            return res.status(403).json({ error: "Access denied! Action not allowed" });
        }

        // If permissions are valid, move to the next middleware or route handler
        next();
    } catch (error) {
        console.error("Error in permission check:", error);
        res.status(500).json({ error: "Server error!" });
    }
};

module.exports = checkPermission;
