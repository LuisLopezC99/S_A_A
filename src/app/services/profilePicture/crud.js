import path from "path";
import fs from 'fs';

export const saveProfilePicture = async (image, id) => {
  try {
    const base64Data = image.split('base64,')[1];
    const imageBuffer = Buffer.from(base64Data, 'base64');
    const imagePath = path.join(process.cwd(), 'public', 'profile-pictures', `${id}.jpg`);
    fs.writeFileSync(imagePath, imageBuffer);
    return "archivo subido";
  } catch (error) {
    throw new Error("Hubo un error al procesar la solicitud");
  }
};