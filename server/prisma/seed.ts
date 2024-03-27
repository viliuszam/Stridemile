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

    await prisma.colourReward.createMany({
      data: [
        {
          pointsRequired: 10,
          colourHex: '#727cf5',
        },
        {
          pointsRequired: 15,
          colourHex: '#d53a47',
        },
      ]
    })

    await prisma.achievement.createMany({
      data: [
        {
          title: 'Begginer',
          description: 'Achieve 300 steps',
          steps_required: 300,
          points: 5,
        },
        {
          title: 'Pro',
          description: 'Achieve 100 steps in 1min',
          steps_required: 100,
          time_required_s: 60,
          points: 5,
        },
        {
          title: 'Expert',
          description: 'Achieve 3000 steps',
          steps_required: 3000,
          points: 15,
        },
        {
          title: 'Sportsman',
          description: 'Achieve 150 steps in 1min',
          steps_required: 150,
          time_required_s: 60,
          points: 20,
        },
        {
          title: 'Novice',
          description: 'Achieve 1500 steps',
          steps_required: 1500,
          points: 10,
        },
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

    // Seeding data for demonstration

    // Users
    await prisma.user.createMany({
      data: [
        {
          username: 'strideuser1',
          email: 'user1@stridemile.com',
          createdAt: new Date(),
          updatedAt: new Date(),
          hash: '$argon2id$v=19$m=65536,t=3,p=4$rz4/aQ/TQwFx0jm/Lrm5Ew$QxXbv6EpGIeUfMm2HgsFgFPkN6ODJbvvKupeuY0633M',
          resetPassToken: '',
          colourHex: '#000000',
          fk_Roleid: 3
        },
        {
          username: 'strideuser2',
          email: 'user2@stridemile.com',
          createdAt: new Date(),
          updatedAt: new Date(),
          hash: '$argon2id$v=19$m=65536,t=3,p=4$rz4/aQ/TQwFx0jm/Lrm5Ew$QxXbv6EpGIeUfMm2HgsFgFPkN6ODJbvvKupeuY0633M',
          resetPassToken: '',
          colourHex: '#000000',
          fk_Roleid: 3
        },
        {
          username: 'strideuser3',
          email: 'user3@stridemile.com',
          createdAt: new Date(),
          updatedAt: new Date(),
          hash: '$argon2id$v=19$m=65536,t=3,p=4$rz4/aQ/TQwFx0jm/Lrm5Ew$QxXbv6EpGIeUfMm2HgsFgFPkN6ODJbvvKupeuY0633M',
          resetPassToken: '',
          colourHex: '#000000',
          fk_Roleid: 3
        },        
        {
          username: 'strideuser4',
          email: 'user4@stridemile.com',
          createdAt: new Date(),
          updatedAt: new Date(),
          hash: '$argon2id$v=19$m=65536,t=3,p=4$rz4/aQ/TQwFx0jm/Lrm5Ew$QxXbv6EpGIeUfMm2HgsFgFPkN6ODJbvvKupeuY0633M',
          resetPassToken: '',
          colourHex: '#000000',
          fk_Roleid: 3
        },        
        {
          username: 'strideuser5',
          email: 'user5@stridemile.com',
          createdAt: new Date(),
          updatedAt: new Date(),
          hash: '$argon2id$v=19$m=65536,t=3,p=4$rz4/aQ/TQwFx0jm/Lrm5Ew$QxXbv6EpGIeUfMm2HgsFgFPkN6ODJbvvKupeuY0633M',
          resetPassToken: '',
          colourHex: '#000000',
          fk_Roleid: 3
        },
      ],
    });
    
    // Groups
    await prisma.group.createMany({
      data: [
        {
          name: 'Basketball Fanclub',
          description: 'A meeting place for basketball fans.',
          image_url: 'http://localhost:3333/uploads/groupimages/lebrondunking237d5b56-a637-49a3-9d1f-6a84f541b1b3.png',
          banner_url: 'http://localhost:3333/uploads/bannerimages/basketbannerfa5cbcb7-e6d1-49f8-9666-b16c4b1fe5d1.jpg',
          visibilityId: 1,
          mentorId: 1
        },        
        {
          name: 'Runners United',
          description: 'Casual runners going on casual runs.',
          image_url: 'http://localhost:3333/uploads/groupimages/runnersprofilea39e775f-2296-49b6-ab64-28c0f75e2b8b.jpg',
          banner_url: 'http://localhost:3333/uploads/bannerimages/runbannerb2786d97-eaf1-476b-a9de-5d995526ea50.jpg',
          visibilityId: 1,
          mentorId: 2
        },        
        {
          name: 'Marathon Legends',
          description: 'Professional runners going on long runs.',
          image_url: 'http://localhost:3333/uploads/groupimages/marathonpfpb6c963b2-ea50-40ee-80e6-a1209f9b4d28.webp',
          banner_url: 'http://localhost:3333/uploads/bannerimages/marathonbannerff7c335d-6c0c-495d-9753-adaa33f81f59.jpg',
          visibilityId: 1,
          mentorId: 3
        },       
        {
          name: 'Kaunas Tennis Club',
          description: 'A local tennis club for players from Kaunas.',
          image_url: 'http://localhost:3333/uploads/groupimages/tennispfp3c098f04-0da7-460d-9966-4631d345a0ae.jpg',
          banner_url: 'http://localhost:3333/uploads/bannerimages/tennisbanner7aafc5e2-c1dd-417a-9943-8b904d62626c.jpg',
          visibilityId: 1,
          mentorId: 4
        }
      ],
    });

    // Group members
    await prisma.groupMember.createMany({
      data: [
        {
          groupId: 1,
          userId: 2
        },
        {
          groupId: 1,
          userId: 5
        },
        {
          groupId: 2,
          userId: 3
        },
        {
          groupId: 2,
          userId: 4
        },
        {
          groupId: 3,
          userId: 4
        },
        {
          groupId: 3,
          userId: 5
        },
        {
          groupId: 4,
          userId: 3
        },
        {
          groupId: 4,
          userId: 2
        }
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