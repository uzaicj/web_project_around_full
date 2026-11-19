
import rateLimit from "express-rate-limit";

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, _res, next) => {
    next(
      Object.assign(
        new Error(
          "Too many login attempts from this IP, please try again after 15 minutes."
        ),
        { statusCode: 429 }
      )
    );
  },
});

export const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, _res, next) => {
    next(
      Object.assign(
        new Error(
          "Too many registration attempts from this IP, please try again after 1 hour."
        ),
        { statusCode: 429 }
      )
    );
  },
});
