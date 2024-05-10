import { NextResponse } from "next/server";
import { saveProfilePicture } from "@/app/services/profilePicture/crud";

export const POST = async (request) => {
    try {
      const data = await request.formData();
      const image = data.get("image");
      const id = data.get("id");
      console.log(image)
      const savedProfilePicture = await saveProfilePicture(image,id);
      return NextResponse.json(savedProfilePicture);
    } catch (error) {
      return NextResponse.json(
        { error: "Hubo un error al procesar la solicitud" },
        { status: 500 }
      );
    }
  };