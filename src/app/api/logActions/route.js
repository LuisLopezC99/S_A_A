import { NextResponse } from "next/server";
import { getLoggedActionsByUserId } from "@/app/services/log/functions";

export const GET = async (request) => {
    try {
        const searchParams = request.nextUrl.searchParams
        const userId = searchParams.get("userId")
        const actions = await getLoggedActionsByUserId(parseInt(userId))
        return NextResponse.json(actions)
    } catch (error) {
        return NextResponse.json({ error: "Hubo un error al procesar la solicitud" }, { status: 500 });
    }
}