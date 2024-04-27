import { expect, test, vi } from 'vitest' 
import prisma from '../src/libs/__mocks__/prisma'
import { createSession, readFilterSession } from "../src/app/services/session/crud"

vi.mock("../src/libs/prisma");

test('createSession() deberia de crear la sesion satisfactoriamente', async () => {
    const date = new Date();
    date.setHours(0,0,0,0);
    const dateStr = date.toISOString();
    const newSesion = { date: dateStr,
                        report: 'test.pdf',
                        type: 'test',
                        UrlVideo: 'www.test.com' }
    prisma.tab_session.create.mockResolvedValue({ ...newSesion, id: 1 })
    const session = await createSession(newSesion)
    expect(session).toStrictEqual({ ...newSesion, id: 1 })
})

test('filterSessions() deberia de filtrar por caracteristicas satisfactoriamente. Testeo usando tipo', async () => {
    const date = new Date();
    date.setHours(0,0,0,0);
    const dateStr = date.toISOString();
    const typeToBeTested = 'testType';
    const newSesion1 = { date: dateStr,
        report: 'test1.pdf',
        type: typeToBeTested,
        UrlVideo: 'www.test1.com' }
    const newSesion2 = { date: dateStr,
        report: 'test2.pdf',
        type: typeToBeTested,
        UrlVideo: 'www.test2.com' }

    prisma.tab_session.findMany.mockResolvedValue([
      { ...newSesion1, id: 1 },
      { ...newSesion2, id: 2 }
    ]);
  
    const filteredSessions = await readFilterSession(typeToBeTested);
  
    expect(filteredSessions).toHaveLength(2);
    expect(filteredSessions[0].type).toBe(typeToBeTested);
    expect(filteredSessions[1].type).toBe(typeToBeTested);
  });