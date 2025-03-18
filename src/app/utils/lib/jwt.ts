import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SALT_KEY || 'default_salt';

export interface JwtPayload {
    _id: string;
    email: string;
    role: string;
    name: string;
    exp?: number;
    iat?: number;

}

export function generateToken(payload: JwtPayload): string {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '5d' });
}

export function verifyToken(token: string): JwtPayload {
    try {
        const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
        return decoded;
    } catch (error) {
        throw new Error('Invalid token');
    }
}

export function decodeToken(token: string): JwtPayload | null {
    try {
        return jwt.decode(token) as JwtPayload;
    } catch (error) {
        return null;
    }
}

export function isTokenExpired(token: string): boolean {
    try {
        const decoded = jwt.decode(token) as { exp: number };
        if (!decoded.exp) return true;
        return Date.now() >= decoded.exp * 1000;
    } catch (error) {
        return true;
    }
}