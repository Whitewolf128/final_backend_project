// Import necessary types from the Firebase Admin SDK for Firestore
import { FieldValue, Timestamp } from "firebase-admin/firestore";
// Define a type that encompasses all possible data types that can be stored in Firestore
export type FirestoreDataTypes =
    | string
    | number
    | boolean
    | null
    | Date
    | Timestamp
    | FieldValue;

    