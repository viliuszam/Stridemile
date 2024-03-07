//npx prisma db seed

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  try {

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

        await prisma.goalCategory.createMany({
          data: [
            { id: 1, name: 'fitness' },
            { id: 2, name: 'nutrition' },
            { id: 3, name: 'weight_management' },
            { id: 4, name: 'wellness' },
            { id: 5, name: 'lifestyle_change' },
            { id: 6, name: 'physical_activity' },
            { id: 7, name: 'social_engagement' },
            { id: 8, name: 'skill_development' },
          ],
        });
    
        await prisma.goalStatus.createMany({
          data: [
            { id: 1, name: 'in_progress' },
            { id: 2, name: 'completed' },
            { id: 3, name: 'failed' },
            { id: 4, name: 'pending' },
            { id: 5, name: 'cancelled' },
            { id: 6, name: 'on_hold' },
          ],
        });
    
        await prisma.groupVisibility.createMany({
          data: [
            { id: 1, name: 'public' },
            { id: 2, name: 'private' },
          ],
        });
    
        await prisma.invitationStatus.createMany({
          data: [
            { id: 1, name: 'pending' },
            { id: 2, name: 'accepted' },
            { id: 3, name: 'declined' },
            { id: 4, name: 'expired' },
            { id: 5, name: 'cancelled' },
          ],
        });

    await prisma.personGender.createMany({
      data: [
        { id: 1, name: 'male' },
        { id: 2, name: 'female' },
      ],
    });

    await prisma.achievement.createMany({
      data: [
        {
          title: 'Begginer',
          description: 'Achieve 30 steps',
          steps_required: 30,
        },
        {
          title: 'Pro',
          description: 'Achieve 30 steps in 1min',
          steps_required: 30,
          time_required_s: 60,
        }
      ]
    })

    await prisma.role.createMany({
      data: [
        {
          name: 'Admin',
          description: 'Administrator role with full access',
          creation_date: new Date(),
          is_active: true,
        },
        {
          name: 'Mentor',
          description: 'Manager role with limited access',
          creation_date: new Date(),
          is_active: true,
        },
        {
          name: 'Person',
          description: 'Regular user role with basic access',
          creation_date: new Date(),
          is_active: true,
        },
      ],
    });

    console.log('Seed data inserted successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();