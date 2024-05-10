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
 * Directory: components
 * File: logout
 * Archive: Logout.jsx
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

"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";


export const Logout = () => {

    const router = useRouter();

    const handleLogout = (e) => {
        e.preventDefault();
        signOut({redirect: true})
        .then(res => {
            if(res){

                router.push("/");
            }
        })
    }


    return (
        <li>
            <button onClick={handleLogout} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm text-gray-700 hover:text-gray-800 hover:bg-gray-300">Cerrar Sesión</button>
        </li>
    )
}