import { test, beforeEach, afterEach } from 'vitest';
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { saveFile } from '../src/app/services/file/crud';

test('saveFile() deberia de guardar el archivo de forma exitosa', async ({ expect }) => {
    
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
    
});