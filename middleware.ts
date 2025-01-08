import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { getPersonnelFolder, getUserFolder, verifyToken } from "./lib/verifyToken";
import axios from "axios";

export async function middleware( req: NextRequest ) {

    const token = cookies().get('token')

    // si le user n'a pas de token et sur l'url /dashbaord => redirige vers login pour l'auth
    if (!token && req.nextUrl.pathname.startsWith('/dashboard')) {
        
        return NextResponse.redirect(new URL('/auth/login', req.nextUrl))
    }

    // si token existe et user sur l'url /login, verifier la validité 
    const checkAuth = await verifyToken()    

    if (checkAuth && !req.nextUrl.pathname.startsWith('/dashboard')) {
        
        if (checkAuth.role === 'Medecin' || checkAuth.role === 'Caissier' && !req.nextUrl.pathname.startsWith('/dashboard/personnels')) {

            const getPersonnelfolder = await getPersonnelFolder(checkAuth.ref)
            
            return NextResponse.redirect(new URL(`/dashboard/personnels/dashboard/${getPersonnelfolder._id}`, req.nextUrl))
            
        }else if (checkAuth.role === 'Patient' && !req.nextUrl.pathname.startsWith('/dashboard/patients')) {

            const getUserfolder = await getUserFolder(checkAuth.ref)
            return NextResponse.redirect(new URL(`/dashboard/patients/dashboard/${getUserfolder._id}`, req.nextUrl))
        }

        return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
        
    }


    return NextResponse.next()
}

// Routes Middleware should not run on
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
  }