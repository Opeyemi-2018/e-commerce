import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { errorHandler } from './error.js';

const verifyTokenAsync = promisify(jwt.verify);

export const verifyToken = async (req, res, next) => {
  try {
    // Retrieve token from cookies
    const token = req.cookies.access_token;

    // If token is not present, return Unauthorized
    if (!token) {
      return next(errorHandler(401, 'Unauthorized: No token provided'));
    }

    // Verify the token
    const user = await verifyTokenAsync(token, process.env.JWT_SECRET);

    // Attach the verified user information to the request object
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error('Token verification error:', error.message);
    return next(errorHandler(403, 'Forbidden: Invalid token'));
  }
};
