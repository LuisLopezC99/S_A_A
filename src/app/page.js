import { Login } from "@/app/components/login/Login";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <>
      {!session ? (
        <div>
          <Login />
        </div>
      ) : session.user.role === "admin" ? (
        redirect("/admin")
      ) : (
        redirect("/home")
      )}
    </>
  );
}
