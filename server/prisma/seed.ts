//npx ts-node seed.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  await prisma.activityType.createMany({
    data: [
      { id: 1, name: 'stretching' },
      { id: 2, name: 'balancing' },
      { id: 3, name: 'stabilising' },
      { id: 4, name: 'crossift' },
      { id: 5, name: 'cycling' },
      { id: 6, name: 'jogging' },
      { id: 7, name: 'kickboxing' },
      { id: 8, name: 'pain_management' },
      { id: 9, name: 'healthy_eating' },
      { id: 10, name: 'meal_planning' },
    ],
  });

  await prisma.eventCategory.createMany({
    data: [
      { id: 1, name: 'fitness_workout' },
      { id: 2, name: 'nutrition_workshop' },
      { id: 3, name: 'wellness_retreat' },
      { id: 4, name: 'sports' },
      { id: 5, name: 'health_seminar' },
      { id: 6, name: 'medical_screening' },
      { id: 7, name: 'medical_talk' },
      { id: 8, name: 'rehabilitation_program' },
    ],
  });

  console.log('Seed data inserted successfully');
}

seed()
  .catch((error) => {
    console.error('Error seeding data:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });