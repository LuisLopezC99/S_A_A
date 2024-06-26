"use client";
import Image from "next/image";
import logo from "../../../../public/logo.png";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";
import { useState } from "react";
import ForgotPassword from "../pop-up/ForgotPassword";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [type, setType] = useState("password");
  const router = useRouter();

  const handleToggle = () => {
    if (type === "password") {
      setType("text");
    } else {
      setType("password");
    }
  };

  //function to handle the login
  const handleLogin = async (e) => {
    e.preventDefault();
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });

    //get the email and password from the form
    const payload = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    };

    //sign in with the credentials provider
    const res = await signIn("credentials", {
      //the first parameter is the name of the provider, the second parameter is the payload
      email: payload.email, // we could use other providers like google
      password: payload.password,
      redirect: false,
    });

    //if the response has an error, it means that the credentials are invalid
    if (!showForgotPasswordModal && res?.error) {
      res.error === "User is not enabled"
        ? Swal.fire({
            icon: "error",
            title: "Usuario no habilitado",
            confirmButtonText: "Aceptar",
          })
        : Swal.fire({
            icon: "error",
            title: "Error de autenticacion",
            confirmButtonText: "Aceptar",
          });
    } else if (!showForgotPasswordModal) {
      Toast.fire({
        icon: "success",
        title: "Signed in successfully",
      });
      router.push("/");
      router.refresh();
    }
  };

  return (
    <section className="h-screen flex items-center justify-center">
      <div className="container mx-auto">
        <div className="flex items-center justify-center h-full">
          <div className="w-full md:w-10/12 lg:w-10/12 xl:w-10/12 ">
            <div className="card rounded-lg text-black">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-6/12">
                  <div className="card-body p-5 bg-white">
                    <div className="mx-auto max-w-md">
                      <div className="text-center flex flex-col items-center">
                        <Image
                          src={logo}
                          className="w-20 mb-5"
                          alt="Municipalidad Logo"
                        />
                        <h1 className="mt-5 mb-5 text-xl font-bold">
                          Sistema de Control y Seguimiento de Actas y Acuerdos
                        </h1>
                      </div>

                      <form onSubmit={handleLogin}>
                        <p className="mb-4">Ingresa los datos de su cuenta</p>
                        <div className="mb-4">
                          <input
                            type="email"
                            id="email"
                            name="email"
                            className="px-3 py-2 border rounded-md w-full dark:bg-white"
                            placeholder="Correo Electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>

                        <div className=" mb-4 flex relative items-center">
                          <input
                            type={type}
                            id="password"
                            name="password"
                            className="px-3 py-2 border rounded-md w-full dark:bg-white relative"
                            placeholder="Contraseña"
                          />
                          <span
                            class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                            onClick={handleToggle}
                          >
                               <div className="text-gray-500 focus:outline-none focus:text-gray-600 hover:text-gray-600">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="w-6 h-6"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                  />
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                              </div>

                          </span>
                        </div>

                        {/* Agrega el enlace para "se te olvidó tu contraseña" */}
                        <div className="mb-4 text-right">
                          <button
                            onClick={() => setShowForgotPasswordModal(true)}
                            className="text-green-500 hover:underline"
                          >
                            ¿Se te olvidó tu contraseña?
                          </button>
                        </div>

                        <div className="text-center pt-2 mb-7">
                          <button className="px-4 py-2 bg-gradient-to-r from-green-800 to-yellow-300 text-black rounded-md">
                            Ingresar
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-6/12 bg-gradient-to-r from-green-800 to-yellow-300">
                  <div className="max-w-xl">
                    <div className="text-white px-3 py-4 md:px-14 md:py-14">
                      <h4 className="mb-0 text-3xl py-4 md:px-14 md:py-14 ">
                        Municipalidad de Tibas
                      </h4>
                      <p className="text-sm mb-5 ">
                        La misión es el propósito o la razón de ser de la
                        organización, conforme al principio de legalidad y el
                        marco normativo y de políticas públicas, que establece
                        las competencias de la institución.
                      </p>
                      <p className="text-sm mb-0">
                        Por su parte, la visión recoge las aspiraciones de las
                        personas colaboradoras en la institución, con el fin de
                        alcanzar el perfil organizacional requerido para cumplir
                        los objetivos de desarrollo plasmados en la visión de
                        largo plazo cantonal.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ForgotPassword
        showForgotPasswordModal={showForgotPasswordModal}
        setShowForgotPasswordModal={setShowForgotPasswordModal}
      />
    </section>
  );
};
