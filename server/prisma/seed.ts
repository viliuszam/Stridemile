//npx prisma db seed

import { PrismaClient } from '@prisma/client';
import * as argon from 'argon2'

const prisma = new PrismaClient();

async function seed() {
  const user1password = "user1";
  const user2password = "user2";
  const user3password = "user3";
  const user4password = "user4";
  const user5password = "user5";

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

    await prisma.emojiReward.createMany({
      data: [
        {
          pointsRequired: 5,
          emoji: '🏃',
        },
        {
          pointsRequired: 7,
          emoji: '🚴',
        },
        {
          pointsRequired: 10,
          emoji: '🏀',
        },
        {
          pointsRequired: 12,
          emoji: '⚽',
        },
        {
          pointsRequired: 15,
          emoji: '⚾',
        },
        {
          pointsRequired: 18,
          emoji: '🎳',
        },
        {
          pointsRequired: 20,
          emoji: '🎣',
        },
        {
          pointsRequired: 25,
          emoji: '🎾',
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
        {
          title: 'Begginer logger',
          description: 'Log your intake 5 times',
          logs_required: 5,
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
          username: 'MegaRunner',
          email: 'user1@stridemile.com',
          createdAt: new Date(),
          updatedAt: new Date(),
          hash: await argon.hash(user1password),
          resetPassToken: '',
          colourHex: '#000000',
          profile_picture: 'http://localhost:3333/uploads/userimages/Websearch-rafiki621a194d-a9e7-49fa-a004-1b222f9a88ce.png',
          registration_date: new Date(),
          fk_Roleid: 3
        },
        {
          username: 'UltraStar',
          email: 'user2@stridemile.com',
          createdAt: new Date(),
          updatedAt: new Date(),
          hash: await argon.hash(user2password),
          resetPassToken: '',
          colourHex: '#000000',
          profile_picture: 'http://localhost:3333/uploads/userimages/downloadb2568220-d044-4cf3-bcfa-66c850d5ab0a.png',
          registration_date: new Date(),
          fk_Roleid: 3
        },
        {
          username: 'Lord Lancelot',
          email: 'user3@stridemile.com',
          createdAt: new Date(),
          updatedAt: new Date(),
          hash: await argon.hash(user3password),
          resetPassToken: '',
          colourHex: '#000000',
          profile_picture: 'http://localhost:3333/uploads/userimages/Messenger_creation_f4136f00-cba1-46a7-aa16-e1c18587393a39d2f2fb-5c3f-4c47-bd1f-2bff0f46d6a7.jpeg',
          registration_date: new Date(),
          fk_Roleid: 3
        },
        {
          username: 'zizzy',
          email: 'user4@stridemile.com',
          createdAt: new Date(),
          updatedAt: new Date(),
          hash: await argon.hash(user4password),
          resetPassToken: '',
          colourHex: '#000000',
          profile_picture: 'http://localhost:3333/uploads/userimages/2702343eec6cf68-d261-4841-bc97-0fb12a9db55c.jpg',
          registration_date: new Date(),
          fk_Roleid: 3
        },
        {
          username: 'prorunner',
          email: 'user5@stridemile.com',
          createdAt: new Date(),
          updatedAt: new Date(),
          hash: await argon.hash(user5password),
          resetPassToken: '',
          colourHex: '#000000',
          profile_picture: 'http://localhost:3333/uploads/userimages/downloadc0d9ff98-3408-4600-af37-40cf1a35f302.jpg',
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
          image_url: 'http://localhost:3333/uploads/groupimages/basketball.jpg',
          banner_url: 'http://localhost:3333/uploads/bannerimages/basketball.jpg',
          visibilityId: 1,
          mentorId: 1
        },
        {
          name: 'Runners United',
          description: 'Casual runners going on casual runs.',
          image_url: 'http://localhost:3333/uploads/groupimages/marathon.webp',
          banner_url: 'http://localhost:3333/uploads/bannerimages/runner.png',
          visibilityId: 1,
          mentorId: 2
        },
        {
          name: 'Marathon Legends',
          description: 'Professional runners going on long runs.',
          image_url: 'http://localhost:3333/uploads/groupimages/last-minute-marathon-tips-722x406.jpg',
          banner_url: 'http://localhost:3333/uploads/bannerimages/marathon.jpg',
          visibilityId: 1,
          mentorId: 3
        },
        {
          name: 'Kaunas Tennis Club',
          description: 'A local tennis club for players from Kaunas.',
          image_url: 'http://localhost:3333/uploads/groupimages/tennis.jpg',
          banner_url: 'http://localhost:3333/uploads/bannerimages/tennis.jpg',
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

    await prisma.shopItem.createMany({
      data: [
        {
          title: "Original bottle",
          description: "Get this original bottle",
          price: 10,
          category: 'CUSTUMISATION',
          image_url: "http://localhost:3333/uploads/itemimages/Water-Bottle-PNG-Picture.png"
        },
        {
          title: "Warm scarf",
          description: "Get this limited time scarf",
          price: 20,
          category: 'CUSTUMISATION',
          image_url: "http://localhost:3333/uploads/itemimages/scarfimage.jpg"
        },
        {
          title: "Vitamins",
          description: "Get vitamin A pills",
          price: 10,
          category: 'HEALTH',
          image_url: "http://localhost:3333/uploads/itemimages/vitamins.jpg"
        },
        {
          title: "Dinner",
          description: "Go to dinner in this fancy restaurant",
          price: 300,
          category: 'HEALTH',
          image_url: "http://localhost:3333/uploads/itemimages/restaurant.webp"
        },
        {
          title: "Pen",
          description: "Fancy pen for everyday writing needs",
          price: 3,
          category: 'CUSTUMISATION',
          image_url: "http://localhost:3333/uploads/itemimages/black-pen-png-transparent-1.png"
        }
      ]
    })

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
        }
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