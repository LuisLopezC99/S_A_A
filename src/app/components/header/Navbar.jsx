// Navbar.jsx
import Image from "next/image";
import logo from "../../../../public/logo.png";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { ProfileButton } from "../buttons/ProfileButton";
import ThemeSwitch from "../buttons/ThemeSwitch";

export const Navbar = async () => {
  const session = await getServerSession(authOptions);

  return session ? (
    <nav className="bg-gray-300 border-gray-200 dark:border-gray-600 dark:bg-gray-900">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
        <a
          href={session.user.role === "admin" ? "/admin" : "/home"}
          className="flex items-center pr-5 md:pr-15"
        >
          <Image
            src={logo}
            className="h-auto w-10 mr-3"
            alt="Municipalidad Logo"
          />
          <div>
            <h6 style={{ fontSize: "20px", color: "#62BE1F" }}>
              Sistema de Acuerdos y Actas
            </h6>
            <span
              className="self-center text-base font-semibold whitespace-nowrap dark:text-white"
              style={{ color: "#0355E5" }}
            >
              Municipalidad de Tibás
            </span>
          </div>
        </a>
  
        <div
          id="mega-menu-full"
          className="items-center justify-end font-medium"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 md:mt-0 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:border-0 md:bg-gray-300 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {session.user.role === "admin" ? (
              <></>
            ) : session.user.role === "secretaria" ? (
              <>
                <li className="mt-4 md:mt-0 flex items-center justify-center md:justify-start">
                  <Link
                    href="/home"
                    className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-500 md:p-0 dark:text-white md:dark:hover:text-green-400 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Acuerdos
                  </Link>
                </li>
                <li className="mt-4 md:mt-0 flex items-center justify-center md:justify-start">
                  <Link
                    href="/home/sessions"
                    className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-500 md:p-0 dark:text-white md:dark:hover:text-green-400 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Sesiones
                  </Link>
                </li>
              </>
            ) : (
              <li className="mt-4 md:mt-0 flex items-center justify-center md:justify-start ">
                <Link
                  href="/home"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-500 md:p-0 dark:text-white md:dark:hover:text-green-400 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Acuerdos Asignados
                </Link>
              </li>
            )}
            <li className="mt-4 md:mt-0 flex items-center justify-center md:justify-start">
              <ThemeSwitch />
            </li>
            <li className="mt-4 md:mt-0 flex items-center justify-center md:justify-start">
              <ProfileButton userData={session.user} />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  ) : null;
  

};
