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
          colourName: 'Blue'
        },
        {
          pointsRequired: 35,
          colourHex: '#d53a47',
          colourName: 'Red'
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
          profile_picture: 'http://localhost:3333/uploads/userimages/6IDyCFja_400x400b2a454cb-6938-4b5b-8dee-43d6de8f76b2.jpeg',
          registration_date: new Date(),
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
          profile_picture: 'http://localhost:3333/uploads/userimages/AoBGN5Dfbc1210a-7312-4915-8303-5bc8d5e765bd.png',
          registration_date: new Date(),
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
          profile_picture: 'http://localhost:3333/uploads/userimages/couple-on-tennis-court-sq-400c84a1420-46dc-4073-b57d-96a10bf3a786.jpg',
          registration_date: new Date(),
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
          profile_picture: 'http://localhost:3333/uploads/userimages/golfer-sq-400246627ba-ba00-4154-8a99-e0914e75adaa.jpg',
          registration_date: new Date(),
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
          profile_picture: 'http://localhost:3333/uploads/userimages/unnamed2d72b078-49d5-4e6a-84bd-ffcd83c65155.jpg',
          registration_date: new Date(),
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

    // Group goals
    await prisma.goal.createMany({
      data: [
        {
            title: '10 consecutive three-pointers',
            description: 'Score 10 shots in a row from the three-point field goal.',
            start_date: new Date('2024-03-28T11:36:56.000Z'),
            end_date: new Date('2024-12-28T11:37:06.000Z'),
            target_value: 10,
            current_value: 0,
            fk_Groupid: 1,
            fk_Goalstatusid: 1,
            fk_Goalcategoryid: 6
        }, 
        {
          title: '5K Weekly Challenge',
          description: 'Complete a 5-kilometer run every week for a month.',
          start_date: new Date('2024-03-28T11:36:56.000Z'),
          end_date: new Date('2024-12-28T11:37:06.000Z'),
          target_value: 4,
          current_value: 0,
          fk_Groupid: 2,
          fk_Goalstatusid: 1,
          fk_Goalcategoryid: 6
        },
        {
          title: 'Half-Marathon Preparation',
          description: 'Train to complete a half-marathon within 3 months.',
          start_date: new Date('2024-03-28T11:36:56.000Z'),
          end_date: new Date('2024-12-28T11:37:06.000Z'),
          target_value: 1,
          current_value: 0,
          fk_Groupid: 3,
          fk_Goalstatusid: 1,
          fk_Goalcategoryid: 1
        },
        {
          title: 'Weekly Tennis Matches',
          description: 'Participate in a tennis match every week for a month.',
          start_date: new Date('2024-03-28T11:36:56.000Z'),
          end_date: new Date('2024-12-28T11:37:06.000Z'),
          target_value: 4,
          current_value: 0,
          fk_Groupid: 4,
          fk_Goalstatusid: 1,
          fk_Goalcategoryid: 6
        }
      ],
    });

    // Group events
    await prisma.event.createMany({
      data: [
        {
            title: '5v5 Friendly Team Game',
            description: 'Randomly picked team members, friendly basketball game.',
            date: new Date('2024-04-09T12:00:00.000Z'),
            location: 'Radvilėnų pl. 19, Kaunas',
            fk_Category: 4,
            fk_GroupId: 1
        }, 
        {
          title: 'Casual Saturday Morning Run',
          description: 'Join us for a casual morning run around the city.',
          date: new Date('2024-04-06T08:00:00.000Z'),
          location: 'Taikos pr. 87B, Kaunas',
          fk_Category: 1,
          fk_GroupId: 2
        },
        {
          title: 'Marathon Training Session: Hill Repeats',
          description: 'Get ready for the upcoming marathon with hill repeats training session.',
          date: new Date('2024-04-07T17:00:00.000Z'),
          location: 'Draugystės g. 15A, Kaunas',
          fk_Category: 1,
          fk_GroupId: 3
        },
        {
          title: 'Kaunas Tennis Club Doubles Tournament',
          description: 'Compete in our monthly doubles tournament and showcase your tennis skills.',
          date: new Date('2024-04-12T10:00:00.000Z'),
          location: 'Sporto g. 3, Kaunas',
          fk_Category: 4,
          fk_GroupId: 4
        }
      ],
    });

    // Group challenges
    await prisma.challenge.createMany({
      data: [
        {
          title: 'Three-Point Shooting Challenge',
          description: 'Compete to see who can make the most three-pointers in a week!',
          start_date: new Date('2024-04-01T00:00:00.000Z'),
          end_date: new Date('2024-04-08T23:59:59.999Z'),
          target: 10000,
          fk_Groupid: 1
        },
        {
          title: 'Weekly Mileage Challenge',
          description: 'Challenge yourself to run the most kilometers in a week!',
          start_date: new Date('2024-04-01T00:00:00.000Z'),
          end_date: new Date('2024-04-07T23:59:59.999Z'),
          target: 10000,
          fk_Groupid: 2
        },
        {
          title: 'Marathon Training Challenge',
          description: 'Participate in a structured training program to improve marathon performance!',
          start_date: new Date('2024-04-01T00:00:00.000Z'),
          end_date: new Date('2024-04-30T23:59:59.999Z'),
          target: 10000,
          fk_Groupid: 3
        },
        {
          title: 'Kaunas Tennis Club Doubles Challenge',
          description: 'Compete with your partner to win the most doubles matches in a week!',
          start_date: new Date('2024-04-01T00:00:00.000Z'),
          end_date: new Date('2024-04-07T23:59:59.999Z'),
          target: 10000,
          fk_Groupid: 4
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

    // Health statistics
    await prisma.statistics.createMany({
      data: [
      {
        sleep_duration: "7",
        calories_intake: "1600",
        macroelements_intake: "1200",
        water_intake: "2.1",
        weight: "86",
        fk_UserId: 1,
        date: new Date()
      },
      {
        sleep_duration: "9",
        calories_intake: "1600",
        macroelements_intake: "1200",
        water_intake: "1.2",
        weight: "59",
        fk_UserId: 2,
        date: new Date()
      },
      {
        sleep_duration: "6",
        calories_intake: "1600",
        macroelements_intake: "1200",
        water_intake: "2",
        weight: "74",
        fk_UserId: 3,
        date: new Date()
      },
      {
        sleep_duration: "6.5",
        calories_intake: "1600",
        macroelements_intake: "1200",
        water_intake: "1.7",
        weight: "77",
        fk_UserId: 4,
        date: new Date()
      },
      {
        sleep_duration: "8",
        calories_intake: "1600",
        macroelements_intake: "1200",
        water_intake: "1.6",
        weight: "91",
        fk_UserId: 5,
        date: new Date()
      },
    ]
    });

    // Activity entries
    await prisma.activityEntry.createMany({
      data: [
      {
        fk_Userid: 1,
        steps: 372,
        distance: 284.988,
        start_time: '2024-03-28T11:36:46.000Z',
        end_time: '2024-03-28T11:36:56.000Z'
      },
      {
        fk_Userid: 1,
        steps: 373,
        distance: 284.988,
        start_time: '2024-03-28T11:36:56.000Z',
        end_time: '2024-03-28T11:37:06.000Z'
      },
      {
        fk_Userid: 1,
        steps: 372,
        distance: 284.988,
        start_time: '2024-03-28T11:37:06.000Z',
        end_time: '2024-03-28T11:37:16.000Z'
      },
      {
        fk_Userid: 1,
        steps: 372,
        distance: 284.988,
        start_time: '2024-03-28T11:37:16.000Z',
        end_time: '2024-03-28T11:37:26.000Z'
      },
      {
        fk_Userid: 2,
        steps: 372,
        distance: 284.988,
        start_time: '2024-03-28T11:37:16.000Z',
        end_time: '2024-03-28T11:37:26.000Z'
      },
      {
        fk_Userid: 3,
        steps: 372,
        distance: 284.988,
        start_time: '2024-03-28T11:37:16.000Z',
        end_time: '2024-03-28T11:37:26.000Z'
      },
      {
        fk_Userid: 4,
        steps: 372,
        distance: 284.988,
        start_time: '2024-03-28T11:37:16.000Z',
        end_time: '2024-03-28T11:37:26.000Z'
      },
      {
        fk_Userid: 5,
        steps: 372,
        distance: 284.988,
        start_time: '2024-03-28T11:37:16.000Z',
        end_time: '2024-03-28T11:37:26.000Z'
      },
    ]
    });

    console.log('Seed data inserted successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();