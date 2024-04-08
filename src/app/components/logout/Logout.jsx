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