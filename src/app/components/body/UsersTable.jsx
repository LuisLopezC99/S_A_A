
'use client';
import React, { useState, useEffect } from 'react';
import AddUserModal from '../modal/AddUserModal';

const UsersTable = () => {
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [users, setUsers] = useState([]);

  const addUserModalOpen = () => {
    setIsAddUserModalOpen(true);
  }
  const addUserModalClosed = () => {
    setIsAddUserModalOpen(false);
  }
  const handleSearch = ({ target: { value } }) => {
    setFilterText(value);
  }
  const addUser = (newUser) => {
    console.log(newUser)
    console.log(users[0])
    setUsers(prevUsers => [...prevUsers, newUser]);
  }
  useEffect(() => {
    fetch('/api/users')
      .then((response) => response.json())
      .then((data) => setUsers(data));

  }, []);


  return (
    <div className="container mx-auto p-4 dark:bg-gray-800">
      <button
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        onClick={addUserModalOpen}
      >
        Agregar Usuario
      </button>s
      <div className="relative w-full">
        <input onChange={handleSearch} type="search" id="search-dropdown" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search users" required />
      </div>

      <table className="min-w-full bg-white dark:bg-gray-700 border rounded">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">Nombre</th>
            <th className="py-2 px-4 border-b text-left">Correo</th>
            <th className="py-2 px-4 border-b text-left">Role</th>
            <th className="py-2 px-4 border-b text-left">Activo?</th>
            <th className="py-2 px-4 border-b text-left"></th>
            
          </tr>
        </thead>
        <tbody>
          {users
            ?.filter(user => user.name.toLowerCase().includes(filterText.toLowerCase()) || user.email.toLowerCase().includes(filterText.toLowerCase()) || user.role.name.toLowerCase().includes(filterText.toLowerCase()))
            ?.map(user => 
              <tr key={user.name}>
                <td className="py-2 px-4 border-b">{user.name}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">{user.role.name}</td>
                <td className="py-2 px-4 border-b">{user.enabled ? "Si" : "No"}</td>
                <td className="py-2 px-4 border-b">
                  <button

                    className="m-1 p-1 bg-blue-600 text-white px-2 py-1 rounded focus:outline-none focus:shadow-outline"
                  >
                    Editar
                  </button>
                  <button

                    className="bg-red-700 text-white px-2 py-1 rounded focus:outline-none focus:shadow-outline"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            )}
        </tbody>
      </table>
      <AddUserModal isOpen={isAddUserModalOpen} onClose={addUserModalClosed} addNewUser={addUser} />
    </div>
  );
}

export default UsersTable;