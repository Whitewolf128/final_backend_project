// Import the Helmet middleware for setting secure HTTP headers and the Express app instance
import helmet from "helmet";
import app from "../app";
// Adding custom security headers beyond Helmet defaults
app.use(helmet());

// Sets "Content-Security-Policy: default-src 'self';
// script-src 'self' example.com;object-src 'none';
// upgrade-insecure-requests"
// Disable the Content-Security-Policy and X-Download-Options headers
const isDevelopment = app.get("env") === "development";
app.use(
  helmet({
    // Disable the default Helmet content security policy and set a custom one
    contentSecurityPolicy: {
        useDefaults: false,
        directives: {
          // Allow content only from the same origin and example.com, and block all object sources
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "example.com"],
            objectSrc: ["'none'"],
            // In production, enforce upgrading insecure requests to HTTPS
            "upgradeInsecureRequests": isDevelopment ? null: [],
        },
    },
    // Disable the X-Download-Options header to prevent Internet Explorer from prompting to save downloads
    xDownloadOptions: false,
    xFrameOptions: false,
  }),
);

