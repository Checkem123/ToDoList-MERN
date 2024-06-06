import jwt from "jsonwebtoken";

export interface DecodedToken {
    _id?: string; // Add other properties as needed
}

export async function decodeToken(
    token: string,
    secret: string
): Promise<DecodedToken | null> {
    try {
        const decoded = jwt.verify(token, secret) as DecodedToken;
        return decoded;
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
}

export default decodeToken;
