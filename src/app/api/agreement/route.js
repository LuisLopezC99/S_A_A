import { NextResponse } from "next/server";
import { readAgreement, createAgreement, updateAgreement, getLastAgreement, getTotalAgrements } from "@/app/services/agreement/crud";
import { completeAgreements } from "@/app/business/agreement/logic";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route";
import { assignedEmail } from "@/app/services/notification/assigned";


export const GET = async (request) => {
    //const session = await getServerSession(authOptions)
    
    try {
        const { searchParams } = new URL(request.url)
        const addAgrement = searchParams.get("add")
        const lengthAgrement = searchParams.get("count");
        if(lengthAgrement){
            const totalAgrements = await getTotalAgrements();
            return NextResponse.json(totalAgrements);
        }
        const agreements = addAgrement ? await getLastAgreement() : await readAgreement()
        completeAgreements(agreements)
        return NextResponse.json(agreements)
    } catch (error) {
        return NextResponse.json({ error: "Hubo un error al procesar la solicitud" }, { status: 500 });
    }
}

export const POST = async (request) => {
    try {
        const { agreement, agreementID } = await request.json();
        const newInsert = await createAgreement(agreement, agreementID);
        console.log("Este es el newinser", newInsert)
        console.log("Este es el agreement", agreement, agreementID)
        await assignedEmail(newInsert);
        return NextResponse.json(newInsert);
    } catch (error) {
        return NextResponse.json({ error: "Hubo un error al procesar la solicitud. Posible repeticion de archivo" }, { status: 500 });
    }
}

export const PUT = async (request) => {
    try {
        const newUpdate = await updateAgreement(await request.json())
        console.log(newUpdate);
        return NextResponse.json(newUpdate)
    } catch (error) {
        return NextResponse.json({ error: "Hubo un error al procesar la solicitud" }, { status: 500 });
    }
}
