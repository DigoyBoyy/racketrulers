import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create sample client users
  const hashedPassword = await hash('password123', 10);

  const clients = [
    {
      name: 'Alice Johnson',
      email: 'alice@example.com',
    },
    {
      name: 'Bob Smith',
      email: 'bob@example.com',
    },
    {
      name: 'Charlie Brown',
      email: 'charlie@example.com',
    },
    {
      name: 'Diana Prince',
      email: 'diana@example.com',
    },
    {
      name: 'Edward Norton',
      email: 'edward@example.com',
    },
  ];

  for (const client of clients) {
    const existing = await prisma.user.findUnique({
      where: { email: client.email },
    });

    if (!existing) {
      await prisma.user.create({
        data: {
          name: client.name,
          email: client.email,
          password: hashedPassword,
          role: 'CLIENT',
          emailVerified: new Date(),
        },
      });
      console.log(`Created CLIENT user: ${client.email}`);
    } else {
      console.log(`CLIENT user already exists: ${client.email}`);
    }
  }

  console.log('Client seed complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });