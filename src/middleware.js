import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"


export default withAuth(
    function middleware(request){
        if(request?.nextauth?.token?.exp < Date.now() / 1000){
            return NextResponse.redirect("/login")
        }
        if(request.nextUrl.pathname.startsWith("/home")
        && request.nextauth?.token?.user?.role === "admin"){
            return NextResponse.rewrite(
                new URL("http://localhost:3000/admin")
            )
        }
        if(request.nextUrl.pathname.startsWith("/admin")
        && request.nextauth?.token?.user?.role !== "admin"){
            return NextResponse.rewrite(
                new URL("http://localhost:3000/home")
            )
        }
    }
)

export const config = { matcher: ["/home/:path*", "/admin/:path*"], redirect: "/login" }