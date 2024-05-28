/**
 * Proyect: Sistema de acuerdos y actas municipales (SAA)
 * Company: Municipalidad de Tibás
 * Universidad Nacional de Costa Rica
 * School of Informatic
 * Information Systems Engineering
 * 
 * Date: 10/05/2024
 * Principal_Directory: src
 * Archive: middleware.js
 * 
 * Authors:
 * - Scrum: Luis Ignacio López Castro
 *   - email: luis.lopez.castro@est.una.ac.cr
 *   - ID: 402420889
 * - David Coto Solano
 *   - email: victor.coto.solano@est.una.ac.cr
 *   - ID: 305440064
 * - Andrés León Orozco
 *   - email: andres.leon.orozco@est.una.ac.cr
 *   - ID: 118920778
 * - Eduardo Aarón Ojeda Paladino
 *   - email: eduardo.ojeda.paladino@est.una.ac.cr
 *   - ID: 116500136
 * - Jennifer Quirós Chacón
 *   - email: jennifer.quiros.chacon@est.una.ac.cr
 *   - ID: 702790153
 * - José Miguel Sequeira Hernández
 *   - email: jose.sequeira.hernandez@est.una.ac.cr
 *   - ID: 116590034
 */

import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"


export default withAuth(
    function middleware(request){
        if(request?.nextauth?.token?.exp < Date.now() / 1000){
            return NextResponse.rewrite(new URL(`${process.env.NEXTAUTH_URL}/login`))
        }
        if(request.nextUrl.pathname.startsWith("/home")
        && request.nextauth?.token?.user?.role === "admin"){
            return NextResponse.rewrite(
                new URL(`${process.env.NEXTAUTH_URL}/admin`)
            )
        }
        if(request.nextUrl.pathname.startsWith("/admin")
        && request.nextauth?.token?.user?.role !== "admin"){
            return NextResponse.rewrite(
                new URL(`${process.env.NEXTAUTH_URL}/home`)
            )
        }
    }
)

export const config = { matcher: ["/home/:path*", "/admin/:path*"], redirect: "/login" }