import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route'; // Ajusta la ruta según tu estructura

const Flowbar = async () => {
    const session = await getServerSession(authOptions);

    if (!session) return null;

    return (
        <footer className="bg-gray-300 border-gray-200 dark:border-gray-600 dark:bg-gray-900 mt-40">
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                <a
                    href={session.user.role === 'admin' ? '/admin' : '/home'}
                    className="flex items-center pr-5 md:pr-15"
                >
                    <p>©2024 Todos los derechos reservados por Municipalidad de Tibás. Diseño por Universidad Nacional, Escuela de Informática</p>
                </a>
            </div>
        </footer>

    );
};

export default Flowbar;
