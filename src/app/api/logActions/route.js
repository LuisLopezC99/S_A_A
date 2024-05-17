import { NextResponse } from "next/server";
import { getLoggedActionsByUserId } from "@/app/services/log/functions";

// GET handler to fetch logged actions for a specific user based on query parameters.
export const GET = async (request) => {
    try {
        // Extracting search parameters from the request URL
        const searchParams = request.nextUrl.searchParams
        const userId = searchParams.get("userId")
        // Fetch the logged actions for the specified user
        const actions = await getLoggedActionsByUserId(parseInt(userId))
        // Return the logged actions as a JSON response
        return NextResponse.json(actions)
    } catch (error) {
        // Return a 500 error response if there was an issue processing the request
        return NextResponse.json({ error: "Hubo un error al procesar la solicitud" }, { status: 500 });
    }
}