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
    contentSecurityPolicy: {
        useDefaults: false,
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "example.com"],
            objectSrc: ["'none'"],
            "upgradeInsecureRequests": isDevelopment ? null: [],
        },
    },
    xDownloadOptions: false,
    xFrameOptions: false,
  }),
);

