import { NextRequest, NextResponse } from "next/server";
import {saveFile, getFile } from "../../services/file/crud.js";
import path from "path";
import fs from 'fs';

export const GET = async (request) => {
  const searchParams = request.nextUrl.searchParams;
  const filename = searchParams.get("filename");
  const type = searchParams.get("type");
	const filePath = path.join(`${process.env.FILES_LOCATION}${type}`, filename);
  console.log(filePath);
	const data = await fs.readFileSync(filePath);

	return new Response(data, {
		headers: {
			'Content-Type': 'application/octet-stream', 
		},
	});
}

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
