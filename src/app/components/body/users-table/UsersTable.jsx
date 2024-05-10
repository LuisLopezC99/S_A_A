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
 * File_1: body
 * File_2: users-table
 * Archive: UsersTable.jsx
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
import React, { useState, useEffect, use } from "react";
import AddUserModal from "../../pop-up/AddUserModal";
import EditUserModal from "../../pop-up/EditUserModal";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdEditSquare } from "react-icons/md";
import { TiUserAdd } from "react-icons/ti";
import Swal from "sweetalert2";

const UsersTable = () => {
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [users, setUsers] = useState([]);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleActivo = (activedUser) => {
    const editedUser = { ...activedUser, enabled: !activedUser.enabled };
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === activedUser.id
          ? { ...user, enabled: editedUser.enabled }
          : user
      )
    );
    fetch(`/api/users`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedUser),
    })
      .then((response) => response.json())
      .then((_) => _)
      .catch((error) => console.log("Error:", error));
  };
  const handleUpdate = (updatedUser) => {
    const userId = updatedUser.id;
    const role = updatedUser.roleid == 1 ? "admin" :
      updatedUser.roleid == 2 ? "secretaria" :
        updatedUser.roleid == 3 ? "departamento" : "alcaldia";
    // Update the user in the local state
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId
          ? {
            ...user,
            name: updatedUser.name || user.name,
            email: updatedUser.email || user.email,
            role: { name: role || user.role.name },
            enabled:
              updatedUser.enabled !== undefined
                ? updatedUser.enabled
                : user.enabled,
          }
          : user
      )
    );
  };

  const handlePassword = (user) => () => {
    const randomPassword = Math.random().toString(36).slice(-8);
    fetch("/api/users", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...user, password: randomPassword }),
    })
      .then((response) =>
        response.ok ? response.json() : Promise.reject(response)
      )
      .then(() =>
        fetch("/api/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...user,
            password: randomPassword,
            messageType: "reset",
          }),
        })
      )
      .then((response) =>
        response.ok ? response.json() : Promise.reject(response)
      )
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: '¡Correo enviado!',
          text: 'Se ha enviado un correo con la nueva contraseña',
        });
      })
      .catch((error) => console.log("Error:", error));
  };

  const handleEditUser = (user) => () => {
    setSelectedUser(user);
    editUserModalClosed();
  };

  const editUserModalClosed = () => {
    setIsEditUserModalOpen(!isEditUserModalOpen);
  };
  const addUserModalOpen = () => {
    setIsAddUserModalOpen(true);
  };
  const addUserModalClosed = () => {
    setIsAddUserModalOpen(false);
  };
  const handleSearch = ({ target: { value } }) => {
    setFilterText(value);
  };
  const addUser = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };
  useEffect(() => {
    fetch("/api/users")
      .then((response) => response.json())
      .then((data) => (data.error ? setUsers([]) : setUsers(data)))
      .catch((error) => setUsers([]));
  }, []);

  return (
    <div className="container mx-auto p-4 dark:bg-gray-800 min-h-screen">
      <div className="flex items-center justify-between mb-5">
        <button
          className="font-bold py-2 px-4 border border-yellow-700 rounded bg-yellow-200 hover:bg-yellow-300 dark:bg-yellow-400 dark:hover:bg-yellow-500 text-gray-400 px-4 py-2 rounded flex items-center space-x-2 text-gray-600 font-bold"
          onClick={addUserModalOpen}
        >
          <TiUserAdd className="text-lg w-6 h-6 text-gray-600 dark:text-green-600" />
          <span>Agregar</span>
        </button>

        <div className="relative flex items-center w-64">
          <input
            onChange={handleSearch}
            type="search"
            id="search-dropdown"
            className="block w-full p-2 pl-8 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
            placeholder="Buscar Usuarios"
            required
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 text-gray-500 dark:text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>

          </span>
        </div>
      </div>

      <div className="mx-100 my-100 h-full relative overflow-x-auto overflow-x-auto">
        <table className="w-full h-full text-sm text-left text-gray-500 dark:text-gray-400 dark:bg-gray-800 px-10">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left dark:text-black">
                Nombre
              </th>
              <th className="py-2 px-4 border-b text-left dark:text-black">
                Correo
              </th>
              <th className="py-2 px-4 border-b text-left dark:text-black">
                Role
              </th>
              <th className="py-2 px-4 border-b text-left dark:text-black">
                Estado
              </th>
              <th className="py-2 px-4 border-b text-left dark:text-black">
                Editar
              </th>
              <th className="py-2 px-4 border-b text-left dark:text-black">
                Recuperar
              </th>
            </tr>
          </thead>
          <tbody>
            {users
              ?.filter(
                (user) =>
                  user.name.toLowerCase().includes(filterText.toLowerCase()) ||
                  user.email.toLowerCase().includes(filterText.toLowerCase()) ||
                  user.role.name.toLowerCase().includes(filterText.toLowerCase())
              )
              ?.map((user) => (
                <tr key={user.name}>
                  <td className="py-2 px-4 border-b">{user.name}</td>
                  <td className="py-2 px-4 border-b">{user.email}</td>
                  <td className="py-2 px-4 border-b">{user.role.name}</td>
                  <td className="py-2 px-4 border-b">
                    <label className="inline-flex items-center me-5 cursor-pointer">
                      <input
                        type="checkbox"
                        id={`checkbox-${user.id}`}
                        onChange={() => handleActivo(user)}
                        className="sr-only peer"
                        checked={user.enabled}
                      />
                      <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                      <span
                        className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"
                        style={{ width: "60px" }}
                      >
                        {user.enabled ? "Activo" : "Desactivo"}
                      </span>
                    </label>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      className="bg-yellow-200 hover:bg-yellow-300 dark:bg-yellow-400 dark:hover:bg-yellow-500 text-white font-bold py-2 px-4 border border-yellow-700 rounded"
                      id={`editButton-${user.id}`}
                      onClick={handleEditUser(user)}
                    >
                      <MdEditSquare className="w-5 h-5 dark:text-green-600 text-gray-600" alt="Edit" />
                    </button>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      className="bg-yellow-200 dark:bg-yellow-400 hover:bg-yellow-300 dark:hover:bg-yellow-500 text-white font-bold py-2 px-4 border border-yellow-700 rounded"
                      id={`forgotButton-${user.id}`}
                      onClick={handlePassword(user)}
                    >
                      <RiLockPasswordLine className="w-5 h-5 dark:text-green-600 text-gray-600" alt="Forgot" />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <AddUserModal
        isOpen={isAddUserModalOpen}
        onClose={addUserModalClosed}
        addNewUser={addUser}
        className="sm:w-full md:w-3/4 lg:w-1/2 xl:w-1/3"
      />
      <EditUserModal
        isOpen={isEditUserModalOpen}
        onClose={editUserModalClosed}
        editUser={handleUpdate}
        selectedUser={selectedUser}
        className="sm:w-full md:w-3/4 lg:w-1/2 xl:w-1/3"
      />
    </div>
  );
};

export default UsersTable;
