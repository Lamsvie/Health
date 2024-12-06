import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib/verifyToken";

export async function middleware( req: NextRequest ) {

    const token = cookies().get('token')

    // si le user n'a pas de token et sur l'url /dashbaord => redirige vers login pour l'auth
    if (!token && req.nextUrl.pathname.startsWith('/dashboard')) {
        
        return NextResponse.redirect(new URL('/auth/login', req.nextUrl))
    }

    // si token existe et user sur l'url /login, verifier la validité 
    const checkAuth = await verifyToken()


    if (checkAuth && !req.nextUrl.pathname.startsWith('/dashboard')) {
        
        return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
    }

    return NextResponse.next()
}

// Routes Middleware should not run on
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
  }