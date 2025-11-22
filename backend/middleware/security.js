const helmet = require('helmet');

// Security headers middleware using Helmet
const securityHeaders = helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }, // browser might block request from diff domain if that header isnt configured even if cors is configured
    contentSecurityPolicy: false // Disable CSP to allow inline scripts if needed (heck the authctrl email response theres a script tag there)
});

module.exports = { securityHeaders };

