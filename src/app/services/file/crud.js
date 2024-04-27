import path, { resolve } from "path";
import { writeFile, createReadStream, unlink } from "fs/promises";

export const saveFile = async (file, type) => {
  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filePath = path.join(`${process.env.FILES_LOCATION}${type}`, file.name);
    await writeFile(filePath, buffer);
    return "archivo subido";
  } catch (error) {
    throw new Error("Hubo un error al procesar la solicitud");
  }
};


export const updateFile = async (file, type, currentNameFile) => {
  try {
    console.log(type, currentNameFile);
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filePath = path.join(
      `${process.env.FILES_LOCATION}${type}`,
      file.name
    );
    const currentFilePath = path.join(
      `${process.env.FILES_LOCATION}${type}`,
      currentNameFile
    );
    await unlink(currentFilePath);
    await writeFile(filePath, buffer);

    return "archivo subido";
  } catch (error) {
    throw new Error("Hubo un error al procesar la solicitud");
  }
};
