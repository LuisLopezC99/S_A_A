import { NextRequest, NextResponse } from "next/server";
import { countFilteredAgreements, filterAgreement } from "@/app/services/agreement/crud";
import { completeAgreements } from "@/app/business/agreement/logic";

export const GET = async (request, { params }) => {
  try {
    const { searchParams } = new URL(request.url);
    const lengthAgrement = searchParams.get("count");
    if(lengthAgrement){
        const totalDocuments = await countFilteredAgreements(lengthAgrement);
        return NextResponse.json(totalDocuments);
    }
    const agreements = await filterAgreement(params.filter);
    completeAgreements(agreements);
    return NextResponse.json(agreements);
  } catch (error) {
    return NextResponse.json(
      { error: "Hubo un error al procesar la solicitud" },
      { status: 500 }
    );
  }
};