import { NextRequest, NextResponse } from "next/server";
import { filterAgreement } from "@/app/services/agreement/crud";
import { completeAgreements } from "@/app/business/agreement/logic";

export const GET = async (_, { params }) => {
  try {
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
