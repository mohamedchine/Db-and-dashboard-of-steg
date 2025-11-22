const rateLimit = require('express-rate-limit');

// General rate limiter for all routes
const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
});

// Stricter rate limiter for auth routes (login, register, etc.)
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 requests per windowMs for auth routes
    message: 'Too many authentication attempts, please try again after 15 minutes.',
    skipSuccessfulRequests: true, // Don't count successful requests
});

module.exports = { generalLimiter, authLimiter };

