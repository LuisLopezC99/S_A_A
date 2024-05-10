/**
 * Proyect: Sistema de acuerdos y actas municipales (SAA)
 * Company: Municipalidad de Tibás
 * Universidad Nacional de Costa Rica
 * School of Informatic
 * Information Systems Engineering
 * 
 * Date: 10/05/2024
 * Principal_Directory: src
 * Directory_1: app
 * Directory: api
 * File: auth\[...nextauth]
 * Archive: route.js
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

import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { authenticateUser } from "@/app/services/users/crud";

export const authOptions = {
    providers: [ //different ways to sign in, thats why is an array
        CredentialsProvider({ //credentials is a provider that allows us to sign in with credentials 
            name: "Credentials",
            credentials: { // this is an optional form that next auth provides
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) { //authorization part, if the authorization is correct, it returns the token
                if (credentials.email && credentials.password) {
                    //Validade the credentials with the database
                    const user = await authenticateUser(credentials.email, credentials.password)
                    
                    
                    if (user) {
                        if (!user.enabled) {
                            throw new Error("User is not enabled")
                        }
                        return { //returns the token or the session
                            id: user.id,
                            email: user.email,
                            name: user.name,
                            role: user.role.name,
                            operations: user.role.operations,
                            firstTime: user.FirstTime,
                        }
                    } else {
                        throw new Error("Invalid credentials")
                    }
                }
            },

        },
        )
    ],
   
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = user
            }
            return token
        },
        async session({ session, token }) {
            session.user.id = token.user.id;
            session.user.role = token.user.role;
            session.user.username = token.user.name;
            session.user.operations = token.user.operations;
            session.user.firstTime = token.user.firstTime;
            session.exp = token.exp;
            return session;
        },

    },
    secret: process.env.SECRET,
    session: {
        strategy: "jwt",
        maxAge:  60*60 , // 1 horas
      },
      jwt: {
        maxAge:  60*60 , // 4 horas
      },

    pages: {
        signIn: '/',
        // signOut: '/',
        // error: '/auth/error', // Error code passed in query string as ?error=
        // verifyRequest: '/auth/verify-request', // (used for check email message)
        // newUser: null // If set, new users will be directed here on first sign in
    },

};

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }