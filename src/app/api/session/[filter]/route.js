import { NextResponse, NextRequest } from "next/server";
import { Params } from "../../agreement/[filter]/route";
import { readFilterSession } from "../../../services/session/crud.js";
import { completeAgreements } from "@/app/business/agreement/logic";
import { GetAgreement } from "@/app/services/agreement/crud";

export const GET = async (_, { params }) => {
  try {
    const sessions = await readFilterSession(params.filter); //get the sessions that matches with filters

    sessions.forEach((session) => {
      completeAgreements(session.agreements); //establisg the status of the agreements
    });
    sessions ? sessions : [];
    return NextResponse.json(sessions);
  } catch (error) {
    return NextResponse.json(
      { error: "Hubo un error al procesar la solicitud" },
      { status: 500 }
    );
  }
};
