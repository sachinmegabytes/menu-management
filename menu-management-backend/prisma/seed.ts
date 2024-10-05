import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Check if there is any data in the Menu table
  const menuCount = await prisma.menu.count();

  if (menuCount === 0) {
    console.log('No data found, seeding initial data...');

    // Insert initial menu data
    await prisma.menu.createMany({
      data: [
        {
          id: '1',
          name: 'System Management',
          depth: 1,
          parentId: null,
        },
        {
          id: '1.1',
          name: 'System Code',
          depth: 2,
          parentId: '1',
        },
        {
          id: '1.1.1',
          name: 'Code Registration',
          depth: 3,
          parentId: '1.1',
        },
        {
          id: '1.1.2',
          name: 'Code Registration - 2',
          depth: 3,
          parentId: '1.1',
        },
        {
          id: '1.2',
          name: 'Properties',
          depth: 2,
          parentId: '1',
        },
        {
          id: '2',
          name: 'API List',
          depth: 1,
          parentId: null,
        },
        {
          id: '3',
          name: 'Users & Groups',
          depth: 1,
          parentId: null,
        },
      ],
    });

    console.log('Seed data added successfully.');
  } else {
    console.log('Menu data already exists, skipping seed.');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
