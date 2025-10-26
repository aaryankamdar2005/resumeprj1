import jwt from 'jsonwebtoken';

const isAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ 
                success: false,
                message: 'Authorization header missing or invalid' 
            });
        }

        const token = authHeader.split(' ')[1];
        
        // Verify token
        const decoded = jwt.verify(token, "secret"); // Use process.env.JWT_SECRET in production
        
        // Attach user info to request
        req.user = decoded; // This should have { id: userId, ... }
        
        next();
    } catch (error) {
        return res.status(401).json({ 
            success: false, 
            message: 'Invalid or expired token',
            error: error.message 
        });
    }
}

export default isAuth;
