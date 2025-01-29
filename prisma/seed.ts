import { seedUsers } from './seeders/user.seeder';

async function main() {
  try {
    await seedUsers();
    console.log('🎉 All data seeded successfully.');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

main();
