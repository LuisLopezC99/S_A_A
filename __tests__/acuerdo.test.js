import { expect, test, vi } from 'vitest' 
import prisma from '../src/libs/__mocks__/prisma'
import { filterAgreement } from '../src/app/services/agreement/crud';

vi.mock("../src/libs/prisma");

test('filterAgreement() deberia de filtrar por caracteristicas satisfactoriamente. Testeo usando tema', async () => {
    const date = new Date();
    date.setHours(0,0,0,0);
    const dateStr = date.toISOString();
    const topicToBeTested = 'testTopic';
    const newAgreement1 = { 
        topic: topicToBeTested,
        description: 'test1',
        creationDate: dateStr,
        deadline: dateStr,
        report: 'test1.pdf',
        reportCumplimiento: 'test1.pdf',
        session: null,
        users: null,
        agreementId: {
            create: {
                consecutive: 1, // Asegúrate de proveer un valor único
                month: 1, // Asegúrate de proveer un valor válido
                year: 1, // Asegúrate de proveer un valor válido
            },
        },
        state: "test1" }
        const newAgreement2 = { 
            topic: topicToBeTested,
            description: 'test2',
            creationDate: dateStr,
            deadline: dateStr,
            report: 'test2.pdf',
            reportCumplimiento: 'test2.pdf',
            session: null,
            users: null,
            agreementId: {
                create: {
                    consecutive: 2, // Asegúrate de proveer un valor único
                    month: 2, // Asegúrate de proveer un valor válido
                    year: 2, // Asegúrate de proveer un valor válido
                },
            },
            state: "test2" }

    prisma.tab_agreement.findMany.mockResolvedValue([
      { ...newAgreement1, id: 1 },
      { ...newAgreement2, id: 2 }
    ]);
  
    const filteredAgreements = await filterAgreement(topicToBeTested);
  
    expect(filteredAgreements).toHaveLength(2);
    expect(filteredAgreements[0].topic).toBe(topicToBeTested);
    expect(filteredAgreements[1].topic).toBe(topicToBeTested);
  });

  test('filterAgreement() deberia de filtrar los acuerdos por usuario satisfactoriamente', async () => {
    const date = new Date();
    date.setHours(0,0,0,0);
    const dateStr = date.toISOString();
    const userToBeTested = 'testUser';
    const newAgreement1 = { 
        topic: 'test1',
        description: 'test1',
        creationDate: dateStr,
        deadline: dateStr,
        report: 'test1.pdf',
        reportCumplimiento: 'test1.pdf',
        session: null,
        users: { name: userToBeTested },
        agreementId: {
            create: {
                consecutive: 1, // Asegúrate de proveer un valor único
                month: 1, // Asegúrate de proveer un valor válido
                year: 1, // Asegúrate de proveer un valor válido
            },
        },
        state: "test1" }
        const newAgreement2 = { 
            topic: 'test2',
            description: 'test2',
            creationDate: dateStr,
            deadline: dateStr,
            report: 'test2.pdf',
            reportCumplimiento: 'test2.pdf',
            session: null,
            users: { name: userToBeTested },
            agreementId: {
                create: {
                    consecutive: 2, // Asegúrate de proveer un valor único
                    month: 2, // Asegúrate de proveer un valor válido
                    year: 2, // Asegúrate de proveer un valor válido
                },
            },
            state: "test2" }

    prisma.tab_agreement.findMany.mockResolvedValue([
      { ...newAgreement1, id: 1 },
      { ...newAgreement2, id: 2 }
    ]);
  
    const filteredAgreements = await filterAgreement(userToBeTested);

    expect(filteredAgreements).toHaveLength(2);
    expect(filteredAgreements[0].users.name).toBe(userToBeTested);
    expect(filteredAgreements[1].users.name).toBe(userToBeTested);
  });