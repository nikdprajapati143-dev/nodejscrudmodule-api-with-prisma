import jwt from 'jsonwebtoken';
import prisma from "../utils/prismaClient.js";



export const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'No token provided.' });
    }

    const token = authHeader.split(' ')[1];
    // console.log(token);
    try {
        const tokenExists = await prisma.token.findUnique({ where: { token } });
        // console.log(tokenExists);
        if (!tokenExists) {
            return res.status(401).json({ message: 'Invalid or expired token.' });
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Unauthorized.' });
            }
            // req.userId = decoded.id;
            req.user = decoded;
            
            next();
        });


    } catch (err) {
        return res.status(401).json({ message: 'Token verification failed' });
    }

}

export default authMiddleware;
