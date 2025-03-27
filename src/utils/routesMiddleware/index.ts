import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectToDb } from "../../lib/mongodb/mongodb";
import { decodeToken } from "../../lib/jwt";

type RouteHandler = (req: NextRequest, ...args: any[]) => Promise<NextResponse>;
type Middleware = (handler: RouteHandler) => RouteHandler;

declare global {
    interface Request {
        userId?: string;
        [key: string]: any;
    }
}

// Compose multiple middleware functions
export const composeMiddleware = (...middlewares: Middleware[]) => {
    return (handler: RouteHandler): RouteHandler => {
        return middlewares.reduceRight((prev, middleware) => middleware(prev), handler);
    };
};

export const withErrorHandler: Middleware = (handler: RouteHandler) => {
    return async (req: NextRequest, ...args: any[]) => {
        try {
            await connectToDb();
            return await handler(req, ...args);
        } catch (error) {
            if (error instanceof z.ZodError) {
                return NextResponse.json(
                    { message: "Invalid request data", errors: error.errors },
                    { status: 400 }
                );
            }
            return NextResponse.json(
                { message: "Internal server error" + error },
                { status: 500 }
            );
        }
    }
}

export const authCheck: Middleware = (handler: RouteHandler) => {
    return async (req: NextRequest, ...args: any[]) => {
        try {
            const token = req.cookies.get("token")?.value?.split(",")[0] || req.headers.get("Authorization")?.split(" ")[1];
            if (!token) {
                return NextResponse.json({
                    message: "Unauthorized"
                }, { status: 401 })
            }

            // Attach decoded userId to request object
            const decodedToken = decodeToken(token);
            req.userId = decodedToken?._id as string;
            req.role = decodedToken?.role as string;
            return await handler(req, ...args);
        } catch (error: any) {
            throw new Error(error)
        }
    }
}

export const withAuthAndErrorHandler = composeMiddleware(
    authCheck,
    withErrorHandler,
)

