import { NextRequest, NextResponse } from "next/server";
import {saveFile } from "../../services/file/crud.js";
export const GET = async (request) => {
  try {
    return NextResponse.json("ok");
  } catch (error) {
    return NextResponse.json(
      { error: "Hubo un error al procesar la solicitud" },
      { status: 500 }
    );
  }
};

export const POST = async (request) => {
  try {
    const data = await request.formData();
    const file = data.get("file");
    const type= data.get("type");
    const saveFiles = saveFile(file,type);
    return NextResponse.json(saveFiles);
  } catch (error) {
    return NextResponse.json(
      { error: "Hubo un error al procesar la solicitud" },
      { status: 500 }
    );
  }
};

export const PUT = async (request) => {
  try {
    return NextResponse.json("ok");
  } catch (error) {
    return NextResponse.json(
      { error: "Hubo un error al procesar la solicitud" },
      { status: 500 }
    );
  }
};
