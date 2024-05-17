import { NextResponse } from "next/server";
import { saveProfilePicture } from "@/app/services/profilePicture/crud";

// POST handler to save a profile picture for a user.
export const POST = async (request) => {
    try {
      // Parse the form data from the incoming request
      const data = await request.formData();

      // Extract the image and id fields from the form data
      const image = data.get("image");
      const id = data.get("id");

       // Save the profile picture using the saveProfilePicture function
      const savedProfilePicture = await saveProfilePicture(image,id);

      // Return a JSON response containing the result of the save operation
      return NextResponse.json(savedProfilePicture);
    } catch (error) {
      return NextResponse.json(
        // Return a 500 error response if there was an issue processing the request
        { error: "Hubo un error al procesar la solicitud" },
        { status: 500 }
      );
    }
  };