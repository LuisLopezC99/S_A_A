"use client";
import React, { use, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export default PasswordModal = ({ user }) => {
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [correcto, setCorrecto] = useState("");


    const handleSubmit = () => {
        console.log(user);
        if (password.length < 8) {
            setError("La contraseña debe tener al menos 8 caracteres");
            return;
        }

        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }

        if (!/[A-Z]/.test(password)) {
            setError("La contraseña debe contener al menos una letra mayúscula");
            return;
        }

        if (!/[a-z]/.test(password)) {
            setError("La contraseña debe contener al menos una letra minúscula");
            return;
        }

        if (!/\d/.test(password)) {
            setError("La contraseña debe contener al menos un número");
            return;
        }

        if (!/[^a-zA-Z0-9]/.test(password)) {
            setError("La contraseña debe contener al menos un carácter especial");
            return;
        }

        setCorrecto("✅ Formato Correcto...");

        
        const updatedUser = { ...user, password: password, firstTime: false };
        fetch('/api/users', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUser),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al actualizar la contraseña');
                }
                return response.json();
            })
            .then(() => fetch('/api/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...user, password: password, subject: 'Cambio de contraseña', }),
            }))
            .then((response) => {
                if (response.ok) {
                    return signOut({ redirect: true }); 
                } else {
                    return Promise.reject(response);
                }
            })
            .then(() => {
                
                router.push("/");
                alert('Se ha cambiado la contraseña correctamente y se ha enviado un correo de confirmación');
            })
            .catch((error) => console.log('Error:', error));

            


        console.log("Contraseña válida:", password);

    };

    const handleKeyPress = (event) => {
        console.log(event.key);
        if (event.key === "Enter") {
            handleSubmit();
        }
    };

    return (
        <>
            {user.firstTime && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-md">
                        <h2 className="text-lg font-semibold mb-4 dark:text-black">Nueva Contraseña</h2>
                        <p className="mb-4 dark:text-black">Favor crear su nueva contraseña con las siguientes validaciones:</p>
                        <ul className="list-disc pl-6 mb-4 dark:text-black">
                            <li>Debe tener al menos 8 caracteres</li>
                            <li>Debe incluir al menos una letra en mayúscula</li>
                            <li>Debe incluir al menos una letra en minúscula</li>
                            <li>Debe incluir al menos un número</li>
                            <li>Debe incluir al menos un carácter especial</li>
                        </ul>
                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 dark:text-black border rounded-md mb-4 dark:bg-white"
                            onKeyDown={handleKeyPress}
                        />
                        <input
                            type="password"
                            placeholder="Confirmar Contraseña"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-3 py-2 border dark:text-black rounded-md mb-4 dark:bg-white"
                            onKeyDown={handleKeyPress}
                        />
                        {error && <p className="text-red-500 mb-4 dark:text-red-400">{error}</p>}
                        {correcto && <p className="text-green-400 mb-4 dark:text-green-400">{correcto}</p>}
                        <div className="flex justify-end">
                            <button
                                className="px-4 py-2 bg-gradient-to-r from-green-800 to-yellow-300 text-white rounded-md mr-2"
                                onClick={handleSubmit}
                            >
                                Cambiar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};


