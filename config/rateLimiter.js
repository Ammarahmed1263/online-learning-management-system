import rateLimit from 'express-rate-limit';

const generalLimiter = rateLimit({
  windowMs: process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000,
  max: process.env.RATE_LIMIT_MAX || 100,
  message: {
    status: "fail",
    message:
      "Too many requests from this IP, please try again after 15 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});


const authLimiter = rateLimit({
  windowMs: process.env.AUTH_RATE_LIMIT_WINDOW_MS || 60 * 60 * 1000,
  max: process.env.AUTH_RATE_LIMIT_MAX || 5,
  message: {
    status: "fail",
    message:
    "Too many login attempts from this IP, please try again after 1 hour.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export { generalLimiter, authLimiter };