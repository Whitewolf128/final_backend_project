// Import necessary modules and types from the Firebase Admin SDK
import { initializeApp, cert, ServiceAccount, App, getApps, AppOptions} from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import { getAuth, Auth } from "firebase-admin/auth";
import * as serviceAccount from "../../serviceAccount.json";
// Initialize the Firebase app with the service account credentials
// This step is necessary before you can use any Firebase services
initializeApp({
    credential: cert(serviceAccount as ServiceAccount),
});

const getFirebaseConfig = (): AppOptions => {
    // Extract Firebase credentials from environment variables
    const {
        FIREBASE_PROJECT_ID,
        FIREBASE_CLIENT_EMAIL,
        FIREBASE_PRIVATE_KEY,
    } = process.env;

    // Validate that all required configuration values are present
    if (
        !FIREBASE_PROJECT_ID ||
        !FIREBASE_CLIENT_EMAIL ||
        !FIREBASE_PRIVATE_KEY
    ) {
        // You could definitely create a custom error to use here
        throw new Error(
            "Missing Firebase configuration. Please check your environment variables."
        );
    }

    // Create a service account object with the provided credentials
    const serviceAccount: ServiceAccount = {
        projectId: FIREBASE_PROJECT_ID,
        clientEmail: FIREBASE_CLIENT_EMAIL,
        // Replace escaped newlines in the private key string with actual newlines
        privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    };

    // Return the app configuration with credentials
    return {
        credential: cert(serviceAccount),
    };
};

    // Get a reference to the Firestore service
    // This creates a Firestore instance that you can use to interact with your database
const initializeFirebaseAdmin = (): App => {
    // Check if an app is already initialized
    const existingApp: App = getApps()[0];
    if (existingApp) {
        // Return existing app if found
        return existingApp;
    }
    return initializeApp(getFirebaseConfig());
}
// Get a reference to the Firestore service
const app: App = initializeFirebaseAdmin();
const db: Firestore = getFirestore();
const auth: Auth = getAuth(app);

// Export the Firestore and Auth instances for use in other parts of the application
export { db, auth };