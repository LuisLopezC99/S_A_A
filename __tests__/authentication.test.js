import { expect, test, vi } from 'vitest' 
import prisma from '../src/libs/__mocks__/prisma'

vi.mock("../src/libs/prisma");

test('updatePassword() deberia de resetear la contrasenha del usuario satisfactoriamente', async () => {
  const session = { user: { id: 1 } };
  const user = {
    currentPassword: 'currentPassword',
    newPassword: 'newPassword',
  };

  const actualEncryptPass = { password: 'hashedPassword' };
  prisma.tab_user.findUnique.mockResolvedValue(actualEncryptPass);

  bcrypt.compare.mockResolvedValue(true);

  bcrypt.hash.mockResolvedValue('newHashedPassword');

  const updatedUser = { id: 1, password: 'newHashedPassword' };
  prisma.tab_user.update.mockResolvedValue(updatedUser);

  getServerSession.mockResolvedValue(session);

  const { req, res } = createMocks();

  await updatePassword(req, res);
});
