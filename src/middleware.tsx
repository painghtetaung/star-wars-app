import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCookie } from "cookies-next";

// TODO : Need to define some types
export async function middleware(req: NextRequest) {
    const auth_token = getCookie("auth_token", { req });
    const isLoginPage =
        req.nextUrl.pathname === "/login"
    console.log(req.nextUrl.pathname, "auth_token hoha");
    const rootPage = req.nextUrl.pathname === "/login"

    const isAuth = !!auth_token;

    if (isAuth) {
        if(isLoginPage) {
            return NextResponse.redirect(new URL("/", req.url));
        }else{
            return  NextResponse.next();
        }
    } else if(isLoginPage) {
        return  NextResponse.next();
    }else {
        return NextResponse.redirect(new URL("/login", req.url));
    }
    // if(isAuthPage) {
    //     if(!isAuth) {
    //         return NextResponse.next();
    //     }else{
    //         return NextResponse.redirect(new URL("/", req.url));
    //     }
    // }else {
    //     if(!isAuth) {
    //         return NextResponse.redirect(new URL("/login", req.url));
    //     }else{
    //         return NextResponse.redirect(new URL("/", req.url));
    //     }
    // }
}

export const config = {
    /*
     * Match all request paths except for the ones starting with:
     * - login (login page)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - images (static images such as svg files)
     * - fonts
     * - favicon.ico (favicon file)
     */
    matcher: ["/", "/login"],
};
