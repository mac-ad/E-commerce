import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decodeToken } from "./app/utils/lib/jwt";

const handleAdminRoute = (req: NextRequest) => {
  const token = req.cookies.get("token")?.value?.split(",")[0] || req.headers.get("Authorization")?.split(" ")[1];
  const decodedToken = token ? decodeToken(token) : null;
  console.log(decodedToken,"decodedToken")
  let redirectUrl = "/";
  if(!decodedToken) redirectUrl = "/login";
  if(decodedToken?.role === "admin") {
    return NextResponse.next()
  }; 
  return NextResponse.redirect(new URL(redirectUrl, req.url));
}

const handleAuthRoute = (req: NextRequest) => {
  const token = req.cookies.get("token")?.value?.split(",")[0] || req.headers.get("Authorization")?.split(" ")[1];
  const decodedToken = token ? decodeToken(token) : null;
  if(!decodedToken) return NextResponse.next();
  let redirectUrl = "/";
  return NextResponse.redirect(new URL(redirectUrl, req.url));
}

export function middleware(req: NextRequest) {
  const {pathname} = req.nextUrl;

  // Check token expiration
  const token = req.cookies.get("token")?.value?.split(",")[0] || req.headers.get("Authorization")?.split(" ")[1];
  if (token) {
    const decodedToken = decodeToken(token);
    if (decodedToken && decodedToken.exp && decodedToken.exp * 1000 < Date.now()) {
      // Token is expired, create response to remove cookie
      const response = NextResponse.next();
      response.cookies.delete("token");
      return response;
    }
  }
  
  const isAdminRoute = pathname.startsWith("/admin");
  if(isAdminRoute) return handleAdminRoute(req);

  const isAuthRoute = pathname.startsWith("/login") || pathname.startsWith("/register");
  if(isAuthRoute) return handleAuthRoute(req);

  // for api routes
  const response = NextResponse.next();

  // const token = req.cookies.get("token")?.value?.split(",")[0] || req.headers.get("Authorization")?.split(" ")[1];
  const decodedToken = token ? decodeToken(token) : null;

  // Set CORS headers
  response.headers.set("Access-Control-Allow-Credentials", "true");
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET,DELETE,PATCH,POST,PUT");
  response.headers.set(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
  );

  // Check if request is POST, PUT, or DELETE and not a cart API route
  // if (
  //   ['POST', 'PUT', 'DELETE'].includes(req.method) && 
  //   !pathname.startsWith('/api/cart')
  // ) {
  //   // Check if user is admin
  //   if (!decodedToken || decodedToken.role !== 'admin') {
  //     return NextResponse.json(
  //       { message: "Unauthorized - Admin access required" },
  //       { status: 401, headers: response.headers }
  //     );
  //   }
  // }

  // Handle preflight requests (OPTIONS method)
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: response.headers });
  }

  return response;
}

// Apply middleware to all API routes
export const config = {
  matcher: ["/admin/:path*","/api/:path*","/login","/register"],
};
