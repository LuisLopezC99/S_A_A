import "./globals.css";
import { Inter } from "next/font/google";
import { Navbar } from "./components/header/Navbar";
import { Providers } from "./providers";
import SessionAuthProvider from "./context/SessionAuthProvider";
import AutoLogoutProvider from "./components/utils/SesionInactivityHandler";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sistema de Actas y Acuerdos",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="dark:bg-gray-800">
        <SessionAuthProvider>
          <AutoLogoutProvider>
            <Providers>
              <Navbar />
              {children}
            </Providers>
          </AutoLogoutProvider>
        </SessionAuthProvider>
      </body>
    </html>
  );
}
