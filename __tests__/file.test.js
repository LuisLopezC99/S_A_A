import { test, beforeEach, afterEach } from 'vitest';
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { saveFile } from '../src/app/services/file/crud';

test('saveFile() deberia de guardar el archivo de forma exitosa', async ({ expect }) => {
    const fileData = 'File content';
    const filePath = '/path/to/file.txt';

    const result = await saveFile(filePath, fileData);

    expect(result).toBe(true); // Assuming the method returns true on success
    expect(fs.writeFile).toHaveBeenCalledWith(filePath, fileData, expect.any(Function));
});

test('saveFile() deberia de tirar un error si hubo un fallo en el proceso', async ({ expect }) => {
    const fileMock = {
        arrayBuffer: async () => { throw new Error('Error reading file'); } 
    };

    const errorFunction = async () => {
        await saveFile(fileMock, 'type');
    };

    await expect(errorFunction()).rejects.toThrow('Hubo un error al procesar la solicitud');
});

test('getFile() deberia de recuperar el archivo de forma exitosa', async ({ expect }) => {
    const filePath = '/path/to/file.txt';

    const result = await getFile(filePath);

    expect(result).toEqual('File content');
    expect(fs.readFile).toHaveBeenCalledWith(filePath, 'utf8', expect.any(Function));

});