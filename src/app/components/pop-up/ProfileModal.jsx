"use client";
import { useRouter } from "next/navigation";
import { Logout } from "../logout/Logout";
import { useState, useEffect, useRef } from "react";
import { FaUserCircle } from "react-icons/fa";

import { ProfileInformationButton } from "../buttons/ProfileInformationButton";
import AboutButton from "../buttons/AboutButton";

const ProfileModal = ({ isModalOpen, handleModalState, userData}) => {
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const router = useRouter();
  const ref = useRef(null);

  useEffect(() => { 
    const handleOutSideClick = (event) => {
      if (
        isModalOpen &&
        !ref.current?.contains(event.target) &&
        event.target.id !== "openProfileButton"
      ) {
        handleModalState();
      }
    };

    window.addEventListener("mousedown", handleOutSideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [ref, isModalOpen]);

  const closeModal = () => {
    handleModalState();
  };

  const openAboutModal = () => {
    setIsAboutModalOpen(true);
  };

  const closeAboutModal = () => {
    setIsAboutModalOpen(false);
  };

  return (
    <div>
      {isModalOpen && (
        <div
          ref={ref}
          className="dark:bg-gray-700 w-96 absolute z-50 mt-1 w-48 md:w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 origin-top-right right-0"
        >
          <div className="flex flex-col items-center">
            <div className="flex-shrink-0 py-4">
              <FaUserCircle
                id="openProfileButton"
                
                className="w-20 h-20 rounded-full object-cover text-green-600"
                alt="Imagen de Perfil"
              />
            </div>
            <div className="ml-4 text-center">
              <p className="text-lg font-medium dark:text-white">
                {userData["name"].split(" ")[0]}
              </p>
              <p className="text-sm text-gray-500">{userData["email"]}</p>
              <p className="inline-block border-b px-1 bg-gray-600 mt-1 text-sm text-white">
                {userData["role"]}
              </p>
            </div>
            <div className="mt-4 border-t border-b border-gray-350">
              <ul className="flex flex-col items-left text-sm">
                <li className="mt-1 mb-2">
                  <ProfileInformationButton
                    id="profileInformationButton"
                    userData={userData}
                  />

                </li>
                <li className="mb-2">
                  <a
                    href="#"
                    className="md:hover:text-green-500 dark:text-white"
                  >
                    Manual de Usuario
                  </a>
                </li>

                <li className="mb-1">
                
                <AboutButton userData={userData} />

                </li>

              </ul>
            </div>
            <div className="p-3">
              <Logout />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ProfileModal;
