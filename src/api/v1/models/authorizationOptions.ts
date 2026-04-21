// Define options for authorization middleware
export interface AuthorizationOptions {
    hasRole: Array<"admin" | "manager" | "user">;
    allowSameUser?: boolean;
}