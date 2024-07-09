/**
 * Routes which are accessible to public. They do not require authentication. It is an array.
 * @type {string[]}
 */
export const publicRuoutes = ["/"];

/**
 * Routes which are used for authentiction. They will redirect user to /settings. It is also an array.
 * @type {string[]}
 */
export const authRoutes = ["/auth/login", "/auth/register", "/auth/error"];

/**
 * Prefix for api authentication routes. Routes that start with this prefix are used for API authentication purposes.
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * default redirect path after loggin in.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings";
