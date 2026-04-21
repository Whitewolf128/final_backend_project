// config/corsConfig.ts
export const getCorsOptions = () => {
    const isDevelopment = process.env.NODE_ENV === "development";

    if (isDevelopment) {
        // Allow all origins in development for easy testing
        return {
            // Allow requests from any origin
            origin: true,
            // Allow credentials (cookies, authorization headers) to be sent in cross-origin requests
            credentials: true,
        };
    }

    // Strict origins in production
    return {
        // Read allowed origins from environment variable, split by comma, or default to an empty array
        origin: process.env.ALLOWED_ORIGINS?.split(",") || [],
        // Allow credentials (cookies, authorization headers) to be sent in cross-origin requests
        credentials: true,
        // Specify allowed HTTP methods for CORS preflight requests
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    };
};