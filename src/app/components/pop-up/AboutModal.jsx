"use client";
import React from "react";

const AboutModal = ({ isModalOpen, handleModalState }) => {
  const closeModal = () => {
    handleModalState();
  };

  return (
    <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 ${isModalOpen ? 'visible' : 'hidden'}`}>
      <div className="bg-white dark:bg-gray-700 rounded-lg text-black dark:text-white w-full max-w-4xl p-6 relative overflow-y-auto max-h-screen">
        <button className="absolute top-2 right-2 text-gray-500 md:hover:text-green-500" onClick={closeModal}>
          X
        </button>

        <h1 className="text-4xl font-bold mb-4 text-lg-400 font-serif dark:text-white">Sobre Nosotros</h1>
        <div className="py-4">
          <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            En la Universidad Nacional de Costa Rica, nos comprometemos a ofrecer soluciones tecnológicas innovadoras que satisfagan las necesidades específicas de nuestros clientes. En este caso, el equipo scrum trabajó para proporcionar una solución tecnológica avanzada al Municipio de Tibás, específicamente en el área de Web Service.
          </p>
          <h2 className="text-lg font-bold my-4">Misión</h2>
          <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Nuestra misión es desarrollar un Sistema de Control y Seguimiento de Actas que permita a la Municipalidad de Tibás mejorar la eficiencia en la gestión de sus acuerdos, garantizando así una administración transparente y efectiva de los intereses locales.
          </p>
          <h2 className="text-lg font-bold my-4">Visión</h2>
          <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Aspiramos a ser líderes en el desarrollo de soluciones tecnológicas que promuevan la participación ciudadana, la transparencia gubernamental y el desarrollo sostenible en las comunidades locales.
          </p>
          <h2 className="text-lg font-bold my-4">Valores</h2>
          <ul className="list-disc pl-6 text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            <li>Innovación.</li>
            <li>Colaboración.</li>
            <li>Responsabilidad.</li>
            <li>Impacto positivo.</li>
          </ul>
          <h2 className="text-lg font-bold my-4">Equipo</h2>
          <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Nuestro equipo está formado por expertos en desarrollo de software, diseño, gestión de proyectos y atención al cliente, que están comprometidos con la excelencia en cada etapa del proceso de desarrollo del sistema.
          </p>
          <h2 className="text-lg font-bold my-4">Integrantes:</h2>
          <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Scrum: Luis Ignacio López Castro.
          </p>
          <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">Desarrolladores:</p>
          <ul className="list-disc pl-6 text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            <li>David Coto Solano.</li>
            <li>Andrés León Orozco.</li>
            <li>Eduardo Aarón Ojeda Paladino.</li>
            <li>Jennifer Quirós Chacón.</li>
            <li>José Miguel Sequeira Hernández.</li>
          </ul>

          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Versión 1.0</p>

        </div>
        

      </div>
    </div>
  );
};

export default AboutModal;
