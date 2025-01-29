import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function seedUsers() {
  const hashedPassword = await bcrypt.hash('password', 10);

  const user = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      name: 'Admin',
      username: 'admin',
      hashedPassword: hashedPassword,
    },
  });

  console.log(
    `✅ User ${user.username} seeded successfully with the Administrator role.`,
  );
}
