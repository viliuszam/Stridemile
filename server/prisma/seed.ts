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
        // {
        //   username: 'strideuser1',
        //   email: 'user1@stridemile.com',
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        //   hash: '$argon2id$v=19$m=65536,t=3,p=4$rz4/aQ/TQwFx0jm/Lrm5Ew$QxXbv6EpGIeUfMm2HgsFgFPkN6ODJbvvKupeuY0633M',
        //   resetPassToken: '',
        //   colourHex: '#000000',
        //   profile_picture: 'http://localhost:3333/uploads/userimages/6IDyCFja_400x400b2a454cb-6938-4b5b-8dee-43d6de8f76b2.jpeg',
        //   registration_date: new Date(),
        //   fk_Roleid: 3
        // },
        // {
        //   username: 'strideuser2',
        //   email: 'user2@stridemile.com',
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        //   hash: '$argon2id$v=19$m=65536,t=3,p=4$rz4/aQ/TQwFx0jm/Lrm5Ew$QxXbv6EpGIeUfMm2HgsFgFPkN6ODJbvvKupeuY0633M',
        //   resetPassToken: '',
        //   colourHex: '#000000',
        //   profile_picture: 'http://localhost:3333/uploads/userimages/AoBGN5Dfbc1210a-7312-4915-8303-5bc8d5e765bd.png',
        //   registration_date: new Date(),
        //   fk_Roleid: 3
        // },
        // {
        //   username: 'strideuser3',
        //   email: 'user3@stridemile.com',
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        //   hash: '$argon2id$v=19$m=65536,t=3,p=4$rz4/aQ/TQwFx0jm/Lrm5Ew$QxXbv6EpGIeUfMm2HgsFgFPkN6ODJbvvKupeuY0633M',
        //   resetPassToken: '',
        //   colourHex: '#000000',
        //   profile_picture: 'http://localhost:3333/uploads/userimages/couple-on-tennis-court-sq-400c84a1420-46dc-4073-b57d-96a10bf3a786.jpg',
        //   registration_date: new Date(),
        //   fk_Roleid: 3
        // },        
        // {
        //   username: 'strideuser4',
        //   email: 'user4@stridemile.com',
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        //   hash: '$argon2id$v=19$m=65536,t=3,p=4$rz4/aQ/TQwFx0jm/Lrm5Ew$QxXbv6EpGIeUfMm2HgsFgFPkN6ODJbvvKupeuY0633M',
        //   resetPassToken: '',
        //   colourHex: '#000000',
        //   profile_picture: 'http://localhost:3333/uploads/userimages/golfer-sq-400246627ba-ba00-4154-8a99-e0914e75adaa.jpg',
        //   registration_date: new Date(),
        //   fk_Roleid: 3
        // },        
        // {
        //   username: 'strideuser5',
        //   email: 'user5@stridemile.com',
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        //   hash: '$argon2id$v=19$m=65536,t=3,p=4$rz4/aQ/TQwFx0jm/Lrm5Ew$QxXbv6EpGIeUfMm2HgsFgFPkN6ODJbvvKupeuY0633M',
        //   resetPassToken: '',
        //   colourHex: '#000000',
        //   profile_picture: 'http://localhost:3333/uploads/userimages/unnamed2d72b078-49d5-4e6a-84bd-ffcd83c65155.jpg',
        //   registration_date: new Date(),
        //   fk_Roleid: 3
        // },

        {
          username: 'john_doe',
          email: 'john.doe@example.com',
          createdAt: new Date(),
          updatedAt: new Date(),
          hash: '$argon2id$v=19$m=65536,t=3,p=4$rz4/aQ/TQwFx0jm/Lrm5Ew$QxXbv6EpGIeUfMm2HgsFgFPkN6ODJbvvKupeuY0633M',
          resetPassToken: '',
          colourHex: '#123456',
          profile_picture: 'http://localhost:3333/uploads/userimages/AoBGN5Dfbc1210a-7312-4915-8303-5bc8d5e765bd.png',
          registration_date: new Date(),
          fk_Roleid: 3
        },
        {
          username: 'jane_smith',
          email: 'jane.smith@example.com',
          createdAt: new Date(),
          updatedAt: new Date(),
          hash: '$argon2id$v=19$m=65536,t=3,p=4$8dF7s3t5H2R5kI4kN1O7kO2nN2kQ4oM5aQ6oO1jN2iP5uR3kV4qT6lS6rP4pR2kH7fS6r',
          resetPassToken: '',
          colourHex: '#654321',
          profile_picture: 'http://localhost:3333/uploads/userimages/6IDyCFja_400x400b2a454cb-6938-4b5b-8dee-43d6de8f76b2.jpeg',
          registration_date: new Date(),
          fk_Roleid: 3
        },
        {
          username: 'alice_jones',
          email: 'alice.jones@example.com',
          createdAt: new Date(),
          updatedAt: new Date(),
          hash: '$argon2id$v=19$m=65536,t=3,p=4$fH8uD6hP1rO6sD5kG3mR6pF7hL8oI3jR6hK3nG6pD1oK3vF6nP7oR8gL4oJ7mF8sD6k',
          resetPassToken: '',
          colourHex: '#abcdef',
          profile_picture: 'http://localhost:3333/uploads/userimages/golfer-sq-400246627ba-ba00-4154-8a99-e0914e75adaa.jpg',
          registration_date: new Date(),
          fk_Roleid: 3
        },
        {
          username: 'bob_brown',
          email: 'bob.brown@example.com',
          createdAt: new Date(),
          updatedAt: new Date(),
          hash: '$argon2id$v=19$m=65536,t=3,p=4$gH2dL6pO3rK5uF7oN8rO6kH3fP2mS6jP7kI5gH6rL1pO3kT7nF6pD8kR6hM2oK5nR3o',
          resetPassToken: '',
          colourHex: '#ff00ff',
          profile_picture: 'http://localhost:3333/uploads/userimages/AoBGN5Dfbc1210a-7312-4915-8303-5bc8d5e765bd.png',
          registration_date: new Date(),
          fk_Roleid: 3
        },
        {
          username: 'carol_white',
          email: 'carol.white@example.com',
          createdAt: new Date(),
          updatedAt: new Date(),
          hash: '$argon2id$v=19$m=65536,t=3,p=4$sD7kN5oL8rF7gP2kM6nR3hK1oO5kI4jF6oH3pR2nT7lF8pK5oG3mR6pH2oI6kO4jF5u',
          resetPassToken: '',
          colourHex: '#00ff00',
          profile_picture: 'http://localhost:3333/uploads/userimages/golfer-sq-400246627ba-ba00-4154-8a99-e0914e75adaa.jpg',
          registration_date: new Date(),
          fk_Roleid: 3
        },
        {
          username: 'dave_wilson',
          email: 'dave.wilson@example.com',
          createdAt: new Date(),
          updatedAt: new Date(),
          hash: '$argon2id$v=19$m=65536,t=3,p=4$tK5oN8rP6kL1pO3kG6fR2mP7oK4rF5oN6rH3kO5fP2mS6kJ7nL8rP5kO3fN6hP1oR4o',
          resetPassToken: '',
          colourHex: '#ff0000',
          profile_picture: 'http://localhost:3333/uploads/userimages/AoBGN5Dfbc1210a-7312-4915-8303-5bc8d5e765bd.png',
          registration_date: new Date(),
          fk_Roleid: 3
        },
        {
          username: 'eve_clark',
          email: 'eve.clark@example.com',
          createdAt: new Date(),
          updatedAt: new Date(),
          hash: '$argon2id$v=19$m=65536,t=3,p=4$vK7oN6rF8pL1kO5kG3mP6rH2pO5kI4jF6oR3nP7kD1pO3kT7nF8rP5oK3mR6hP2nI6o',
          resetPassToken: '',
          colourHex: '#0000ff',
          profile_picture: 'http://localhost:3333/uploads/userimages/6IDyCFja_400x400b2a454cb-6938-4b5b-8dee-43d6de8f76b2.jpeg',
          registration_date: new Date(),
          fk_Roleid: 3
        },
        {
          username: 'frank_wright',
          email: 'frank.wright@example.com',
          createdAt: new Date(),
          updatedAt: new Date(),
          hash: '$argon2id$v=19$m=65536,t=3,p=4$nK5oP8rL6kF1pO3kG6rR2mP7oN4rF5oK6rH3kO5fP2mS6kJ7nL8rP5kO3fN6hP1oR4o',
          resetPassToken: '',
          colourHex: '#ffff00',
          profile_picture: 'http://localhost:3333/uploads/userimages/unnamed2d72b078-49d5-4e6a-84bd-ffcd83c65155.jpg',
          registration_date: new Date(),
          fk_Roleid: 3
        },
        {
          username: 'grace_hall',
          email: 'grace.hall@example.com',
          createdAt: new Date(),
          updatedAt: new Date(),
          hash: '$argon2id$v=19$m=65536,t=3,p=4$lK5oN8rP6kL1pO3kG6fR2mP7oK4rF5oN6rH3kO5fP2mS6kJ7nL8rP5kO3fN6hP1oR4o',
          resetPassToken: '',
          colourHex: '#ff00ff',
          profile_picture: 'http://localhost:3333/uploads/userimages/unnamed2d72b078-49d5-4e6a-84bd-ffcd83c65155.jpg',
          registration_date: new Date(),
          fk_Roleid: 3
        },
        {
          username: 'harry_king',
          email: 'harry.king@example.com',
          createdAt: new Date(),
          updatedAt: new Date(),
          hash: '$argon2id$v=19$m=65536,t=3,p=4$cK7oP6rF8pL1kO5kG3mP6rH2pO5kI4jF6oR3nP7kD1pO3kT7nF8rP5oK3mR6hP2nI6o',
          resetPassToken: '',
          colourHex: '#00ffff',
          profile_picture: 'http://localhost:3333/uploads/userimages/6IDyCFja_400x400b2a454cb-6938-4b5b-8dee-43d6de8f76b2.jpeg',
          registration_date: new Date(),
          fk_Roleid: 3
        },
        {
          username: 'emily_smith',
          email: 'emily.smith@example.com',
          createdAt: new Date(),
          updatedAt: new Date(),
          hash: '$argon2id$v=19$m=65536,t=3,p=4$aB2cD3eF4gH5iJ6kL7mN8oP9qR0sT1uV2wX3yZ4',
          resetPassToken: '',
          colourHex: '#336699',
          profile_picture: 'http://localhost:3333/uploads/userimages/AoBGN5Dfbc1210a-7312-4915-8303-5bc8d5e765bd.png',
          registration_date: new Date(),
          fk_Roleid: 3
        },
        {
          username: 'mike_jones',
          email: 'mike.jones@example.com',
          createdAt: new Date(),
          updatedAt: new Date(),
          hash: '$argon2id$v=19$m=65536,t=3,p=4$zY1xW2vU3tS4rQ5pO6nM7lK8jI9hG0fE1dC2bA3',
          resetPassToken: '',
          colourHex: '#990000',
          profile_picture: 'http://localhost:3333/uploads/userimages/AoBGN5Dfbc1210a-7312-4915-8303-5bc8d5e765bd.png',
          registration_date: new Date(),
          fk_Roleid: 3
        },
        {
          username: 'jennifer_brown',
          email: 'jennifer.brown@example.com',
          createdAt: new Date(),
          updatedAt: new Date(),
          hash: '$argon2id$v=19$m=65536,t=3,p=4$gF3eD2cB1aA0zZ9xX8wW7vV6uU5tT4sS3rR2qQ1pP0',
          resetPassToken: '',
          colourHex: '#660066',
          profile_picture: 'http://localhost:3333/uploads/userimages/golfer-sq-400246627ba-ba00-4154-8a99-e0914e75adaa.jpg',
          registration_date: new Date(),
          fk_Roleid: 3
        },
        {
          username: 'chris_davis',
          email: 'chris.davis@example.com',
          createdAt: new Date(),
          updatedAt: new Date(),
          hash: '$argon2id$v=19$m=65536,t=3,p=4$yY6xX5wW4vV3uU2tT1sS0rR9qQ8pP7oO6nN5mM4',
          resetPassToken: '',
          colourHex: '#009933',
          profile_picture: 'http://localhost:3333/uploads/userimages/AoBGN5Dfbc1210a-7312-4915-8303-5bc8d5e765bd.png',
          registration_date: new Date(),
          fk_Roleid: 3
        },
        {
          username: 'sarah_taylor',
          email: 'sarah.taylor@example.com',
          createdAt: new Date(),
          updatedAt: new Date(),
          hash: '$argon2id$v=19$m=65536,t=3,p=4$mM5nN6oO7pP8qQ9rR0sS1tT2uU3vV4wW5xX6yY7zZ8',
          resetPassToken: '',
          colourHex: '#ff6600',
          profile_picture: 'http://localhost:3333/uploads/userimages/AoBGN5Dfbc1210a-7312-4915-8303-5bc8d5e765bd.png',
          registration_date: new Date(),
          fk_Roleid: 3
        },
        {
          username: 'matt_williams',
          email: 'matt.williams@example.com',
          createdAt: new Date(),
          updatedAt: new Date(),
          hash: '$argon2id$v=19$m=65536,t=3,p=4$lL5kK4jJ3iI2hH1gG0fF9eE8dD7cC6bB5aA4',
          resetPassToken: '',
          colourHex: '#cc6600',
          profile_picture: 'http://localhost:3333/uploads/userimages/golfer-sq-400246627ba-ba00-4154-8a99-e0914e75adaa.jpg',
          registration_date: new Date(),
          fk_Roleid: 3
        },
        {
          username: 'lisa_miller',
          email: 'lisa.miller@example.com',
          createdAt: new Date(),
          updatedAt: new Date(),
          hash: '$argon2id$v=19$m=65536,t=3,p=4$kK3jJ2iI1hH0gG9fF8eE7dD6cC5bB4aA3zZ2xX1wW0',
          resetPassToken: '',
          colourHex: '#cc0099',
          profile_picture: 'http://localhost:3333/uploads/userimages/AoBGN5Dfbc1210a-7312-4915-8303-5bc8d5e765bd.png',
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
          mentorId: 11
        },
        {
          name: 'Runners United',
          description: 'Casual runners going on casual runs.',
          image_url: 'http://localhost:3333/uploads/groupimages/runnersprofilea39e775f-2296-49b6-ab64-28c0f75e2b8b.jpg',
          banner_url: 'http://localhost:3333/uploads/bannerimages/runbannerb2786d97-eaf1-476b-a9de-5d995526ea50.jpg',
          visibilityId: 1,
          mentorId: 12
        },
        {
          name: 'Marathon Legends',
          description: 'Professional runners going on long runs.',
          image_url: 'http://localhost:3333/uploads/groupimages/marathonpfpb6c963b2-ea50-40ee-80e6-a1209f9b4d28.webp',
          banner_url: 'http://localhost:3333/uploads/bannerimages/marathonbannerff7c335d-6c0c-495d-9753-adaa33f81f59.jpg',
          visibilityId: 1,
          mentorId: 13
        },
        {
          name: 'Kaunas Tennis Club',
          description: 'A local tennis club for players from Kaunas.',
          image_url: 'http://localhost:3333/uploads/groupimages/tennispfp3c098f04-0da7-460d-9966-4631d345a0ae.jpg',
          banner_url: 'http://localhost:3333/uploads/bannerimages/tennisbanner7aafc5e2-c1dd-417a-9943-8b904d62626c.jpg',
          visibilityId: 1,
          mentorId: 6
        },
        {
          name: 'Fitness Enthusiasts',
          description: 'A group for people who love fitness and workout routines.',
          image_url: 'http://localhost:3333/uploads/groupimages/marathonpfpb6c963b2-ea50-40ee-80e6-a1209f9b4d28.webp',
          banner_url: 'http://localhost:3333/uploads/bannerimages/marathonbannerff7c335d-6c0c-495d-9753-adaa33f81f59.jpg',
          visibilityId: 1,
          mentorId: 8
        },
        {
          name: 'Healthy Eating',
          description: 'Share recipes and tips for maintaining a healthy diet.',
          image_url: 'http://localhost:3333/uploads/groupimages/runnersprofilea39e775f-2296-49b6-ab64-28c0f75e2b8b.jpg',
          banner_url: 'http://localhost:3333/uploads/bannerimages/runbannerb2786d97-eaf1-476b-a9de-5d995526ea50.jpg',
          visibilityId: 1,
          mentorId: 10
        },
        {
          name: 'Mental Wellness',
          description: 'A support group for mental health and wellness.',
          image_url: 'http://localhost:3333/uploads/groupimages/tennispfp3c098f04-0da7-460d-9966-4631d345a0ae.jpg',
          banner_url: 'http://localhost:3333/uploads/bannerimages/tennisbanner7aafc5e2-c1dd-417a-9943-8b904d62626c.jpg',
          visibilityId: 1,
          mentorId: 6
        },
        {
          name: 'Yoga Practitioners',
          description: 'A group for yoga enthusiasts to share tips and routines.',
          image_url: 'http://localhost:3333/uploads/groupimages/marathonpfpb6c963b2-ea50-40ee-80e6-a1209f9b4d28.webp',
          banner_url: 'http://localhost:3333/uploads/bannerimages/marathonbannerff7c335d-6c0c-495d-9753-adaa33f81f59.jpg',
          visibilityId: 1,
          mentorId: 8
        },
        {
          name: 'Running Club',
          description: 'Connect with others who enjoy running and track your progress.',
          image_url: 'http://localhost:3333/uploads/groupimages/lebrondunking237d5b56-a637-49a3-9d1f-6a84f541b1b3.png',
          banner_url: 'http://localhost:3333/uploads/bannerimages/basketbannerfa5cbcb7-e6d1-49f8-9666-b16c4b1fe5d1.jpg',
          visibilityId: 1,
          mentorId: 14
        },
        {
          name: 'Weight Loss Support',
          description: 'A support group for individuals on a weight loss journey.',
          image_url: 'http://localhost:3333/uploads/groupimages/runnersprofilea39e775f-2296-49b6-ab64-28c0f75e2b8b.jpg',
          banner_url: 'http://localhost:3333/uploads/bannerimages/runbannerb2786d97-eaf1-476b-a9de-5d995526ea50.jpg',
          visibilityId: 1,
          mentorId: 6
        },
        {
          name: 'Strength Training',
          description: 'Discuss strength training techniques and routines.',
          image_url: 'http://localhost:3333/uploads/groupimages/tennispfp3c098f04-0da7-460d-9966-4631d345a0ae.jpg',
          banner_url: 'http://localhost:3333/uploads/bannerimages/tennisbanner7aafc5e2-c1dd-417a-9943-8b904d62626c.jpg',
          visibilityId: 1,
          mentorId: 7
        },
        {
          name: 'Meditation and Mindfulness',
          description: 'Share meditation practices and mindfulness techniques.',
          image_url: 'http://localhost:3333/uploads/groupimages/marathonpfpb6c963b2-ea50-40ee-80e6-a1209f9b4d28.webp',
          banner_url: 'http://localhost:3333/uploads/bannerimages/marathonbannerff7c335d-6c0c-495d-9753-adaa33f81f59.jpg',
          visibilityId: 1,
          mentorId: 8
        },
        {
          name: 'Cycling Group',
          description: 'Join other cycling enthusiasts for group rides and tips.',
          image_url: 'http://localhost:3333/uploads/groupimages/lebrondunking237d5b56-a637-49a3-9d1f-6a84f541b1b3.png',
          banner_url: 'http://localhost:3333/uploads/bannerimages/basketbannerfa5cbcb7-e6d1-49f8-9666-b16c4b1fe5d1.jpg',
          visibilityId: 1,
          mentorId: 9
        },
        {
          name: 'Sleep Health',
          description: 'Discuss strategies for improving sleep quality.',
          image_url: 'http://localhost:3333/uploads/groupimages/runnersprofilea39e775f-2296-49b6-ab64-28c0f75e2b8b.jpg',
          banner_url: 'http://localhost:3333/uploads/bannerimages/runbannerb2786d97-eaf1-476b-a9de-5d995526ea50.jpg',
          visibilityId: 1,
          mentorId: 10
        },
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
        },
        {
          title: 'Run 5k every day for a month',
          description: 'Run a 5k every day for 30 days.',
          start_date: new Date('2024-06-01T00:00:00.000Z'),
          end_date: new Date('2024-06-30T23:59:59.000Z'),
          target_value: 30,
          current_value: 0,
          fk_Groupid: 1,
          fk_Goalstatusid: 1,
          fk_Goalcategoryid: 1
        },
        {
          title: 'Lose 5kg in 3 months',
          description: 'Achieve a weight loss of 5kg within 3 months.',
          start_date: new Date('2024-04-01T00:00:00.000Z'),
          end_date: new Date('2024-06-30T23:59:59.000Z'),
          target_value: 5,
          current_value: 0,
          fk_Groupid: 2,
          fk_Goalstatusid: 1,
          fk_Goalcategoryid: 2
        },
        {
          title: 'Yoga every morning for 60 days',
          description: 'Practice yoga every morning for 60 consecutive days.',
          start_date: new Date('2024-07-01T00:00:00.000Z'),
          end_date: new Date('2024-08-29T23:59:59.000Z'),
          target_value: 60,
          current_value: 0,
          fk_Groupid: 4,
          fk_Goalstatusid: 1,
          fk_Goalcategoryid: 3
        },
        {
          title: 'Cycle 1000km in a month',
          description: 'Cover a distance of 1000km in a month by cycling.',
          start_date: new Date('2024-09-01T00:00:00.000Z'),
          end_date: new Date('2024-09-30T23:59:59.000Z'),
          target_value: 1000,
          current_value: 0,
          fk_Groupid: 9,
          fk_Goalstatusid: 1,
          fk_Goalcategoryid: 4
        },
        {
          title: 'Meditate for 20 minutes daily for a month',
          description: 'Meditate for at least 20 minutes every day for 30 days.',
          start_date: new Date('2024-05-01T00:00:00.000Z'),
          end_date: new Date('2024-05-30T23:59:59.000Z'),
          target_value: 30,
          current_value: 0,
          fk_Groupid: 8,
          fk_Goalstatusid: 1,
          fk_Goalcategoryid: 5
        },
        {
          title: 'Sleep 8 hours every night for a month',
          description: 'Ensure you get 8 hours of sleep every night for 30 days.',
          start_date: new Date('2024-10-01T00:00:00.000Z'),
          end_date: new Date('2024-10-30T23:59:59.000Z'),
          target_value: 30,
          current_value: 0,
          fk_Groupid: 10,
          fk_Goalstatusid: 1,
          fk_Goalcategoryid: 5
        },
        {
          title: 'Drink 2 liters of water daily for 30 days',
          description: 'Stay hydrated by drinking 2 liters of water every day for a month.',
          start_date: new Date('2024-11-01T00:00:00.000Z'),
          end_date: new Date('2024-11-30T23:59:59.000Z'),
          target_value: 30,
          current_value: 0,
          fk_Groupid: 6,
          fk_Goalstatusid: 1,
          fk_Goalcategoryid: 6
        },
        {
          title: '100 push-ups daily for a month',
          description: 'Complete 100 push-ups every day for 30 days.',
          start_date: new Date('2024-12-01T00:00:00.000Z'),
          end_date: new Date('2024-12-30T23:59:59.000Z'),
          target_value: 30,
          current_value: 0,
          fk_Groupid: 7,
          fk_Goalstatusid: 1,
          fk_Goalcategoryid: 7
        },
        {
          title: 'Join 5 virtual fitness classes',
          description: 'Participate in at least 5 online fitness classes within a month.',
          start_date: new Date('2024-07-01T00:00:00.000Z'),
          end_date: new Date('2024-07-31T23:59:59.000Z'),
          target_value: 5,
          current_value: 0,
          fk_Groupid: 3,
          fk_Goalstatusid: 1,
          fk_Goalcategoryid: 1
        },
        {
          title: 'Complete a half marathon',
          description: 'Successfully complete a half marathon event.',
          start_date: new Date('2024-08-01T00:00:00.000Z'),
          end_date: new Date('2024-08-31T23:59:59.000Z'),
          target_value: 21,
          current_value: 0,
          fk_Groupid: 5,
          fk_Goalstatusid: 1,
          fk_Goalcategoryid: 1
        },
        {
          title: 'Swim 10km in a month',
          description: 'Accumulate a total of 10km in swimming distance over a month.',
          start_date: new Date('2024-09-01T00:00:00.000Z'),
          end_date: new Date('2024-09-30T23:59:59.000Z'),
          target_value: 10,
          current_value: 0,
          fk_Groupid: 2,
          fk_Goalstatusid: 1,
          fk_Goalcategoryid: 2
        },
        {
          title: 'Burn 2000 calories daily for 30 days',
          description: 'Burn a minimum of 2000 calories each day for 30 days.',
          start_date: new Date('2024-10-01T00:00:00.000Z'),
          end_date: new Date('2024-10-30T23:59:59.000Z'),
          target_value: 30,
          current_value: 0,
          fk_Groupid: 4,
          fk_Goalstatusid: 1,
          fk_Goalcategoryid: 3
        },
        {
          title: 'Walk 10,000 steps daily for a month',
          description: 'Achieve a minimum of 10,000 steps each day for 30 days.',
          start_date: new Date('2024-11-01T00:00:00.000Z'),
          end_date: new Date('2024-11-30T23:59:59.000Z'),
          target_value: 30,
          current_value: 0,
          fk_Groupid: 6,
          fk_Goalstatusid: 1,
          fk_Goalcategoryid: 6
        },
        {
          title: 'Complete 30 fitness challenges in a year',
          description: 'Participate and complete 30 different fitness challenges over the year.',
          start_date: new Date('2024-01-01T00:00:00.000Z'),
          end_date: new Date('2024-12-31T23:59:59.000Z'),
          target_value: 30,
          current_value: 0,
          fk_Groupid: 8,
          fk_Goalstatusid: 1,
          fk_Goalcategoryid: 5
        },
        {
          title: 'Achieve a body fat percentage of 15%',
          description: 'Reduce body fat percentage to 15% within 6 months.',
          start_date: new Date('2024-01-01T00:00:00.000Z'),
          end_date: new Date('2024-06-30T23:59:59.000Z'),
          target_value: 15,
          current_value: 0,
          fk_Groupid: 5,
          fk_Goalstatusid: 1,
          fk_Goalcategoryid: 2
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
        },
        {
          title: 'Morning Yoga Session in the Park',
          description: 'Join us for a relaxing morning yoga session in the park. Suitable for all levels.',
          date: new Date('2024-06-15T08:00:00.000Z'),
          location: 'Central Park, New York',
          fk_Category: 1,
          fk_GroupId: 1
        },
        {
          title: '5K Fun Run for Charity',
          description: 'Participate in a 5K fun run to support a local charity. All fitness levels welcome!',
          date: new Date('2024-07-20T09:00:00.000Z'),
          location: 'City Center, Los Angeles',
          fk_Category: 2,
          fk_GroupId: 2
        },
        {
          title: 'Outdoor Bootcamp Workout',
          description: 'Challenge yourself with a high-intensity outdoor bootcamp workout. Bring water and a towel!',
          date: new Date('2024-08-10T07:30:00.000Z'),
          location: 'City Park, Chicago',
          fk_Category: 3,
          fk_GroupId: 3
        },
        {
          title: 'Beach Volleyball Tournament',
          description: 'Compete in a fun-filled beach volleyball tournament with friends and family.',
          date: new Date('2024-09-05T10:00:00.000Z'),
          location: 'Santa Monica Beach, California',
          fk_Category: 5,
          fk_GroupId: 4
        },
        {
          title: 'Cycling Tour: Explore the Countryside',
          description: 'Embark on a scenic cycling tour through the countryside. Breathtaking views guaranteed!',
          date: new Date('2024-10-12T09:30:00.000Z'),
          location: 'Rural Route, Portland',
          fk_Category: 6,
          fk_GroupId: 5
        },
        {
          title: 'Zumba Dance Party',
          description: 'Get your groove on with a high-energy Zumba dance party. All dance levels welcome!',
          date: new Date('2024-11-18T18:00:00.000Z'),
          location: 'Dance Studio, Miami',
          fk_Category: 7,
          fk_GroupId: 6
        },
        {
          title: 'Hiking Expedition: Summiting Mount Everest',
          description: 'Embark on the ultimate hiking adventure and summit Mount Everest!',
          date: new Date('2024-12-08T07:00:00.000Z'),
          location: 'Himalayas, Nepal',
          fk_Category: 2,
          fk_GroupId: 7
        },
        {
          title: 'Swimming Relay Race',
          description: 'Join us for a thrilling swimming relay race at the community pool. Teams of all ages welcome!',
          date: new Date('2025-01-25T13:00:00.000Z'),
          location: 'Community Pool, Seattle',
          fk_Category: 5,
          fk_GroupId: 8
        },
        {
          title: 'Rock Climbing Workshop',
          description: 'Learn the ropes of rock climbing with our expert instructors. Suitable for beginners!',
          date: new Date('2025-02-15T11:00:00.000Z'),
          location: 'Indoor Climbing Gym, Denver',
          fk_Category: 3,
          fk_GroupId: 9
        },
        {
          title: 'Soccer Skills Clinic for Kids',
          description: 'Kids can improve their soccer skills with our fun and interactive skills clinic. Ages 6-12.',
          date: new Date('2025-03-20T14:00:00.000Z'),
          location: 'Soccer Field, Dallas',
          fk_Category: 6,
          fk_GroupId: 10
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
          title: '100 Push-Up Challenge',
          description: 'Challenge yourself to complete 100 push-ups within a month. Build strength and endurance!',
          start_date: new Date('2024-05-01T00:00:00.000Z'),
          end_date: new Date('2024-05-31T23:59:59.999Z'),
          target: 100,
          fk_Groupid: 2
        },
        {
          title: '30-Day Plank Challenge',
          description: 'Strengthen your core muscles with our 30-day plank challenge. Can you hold it for the full duration?',
          start_date: new Date('2024-06-01T00:00:00.000Z'),
          end_date: new Date('2024-06-30T23:59:59.999Z'),
          target: 30,
          fk_Groupid: 4
        },
        {
          title: 'Couch to 5K Challenge',
          description: 'Train for your first 5K race with our beginner-friendly program. Start from the couch and finish strong!',
          start_date: new Date('2024-07-01T00:00:00.000Z'),
          end_date: new Date('2024-07-31T23:59:59.999Z'),
          target: 5000,
          fk_Groupid: 1
        },
        {
          title: '100-Mile Cycling Challenge',
          description: 'Cycle 100 miles within a month and explore new routes and destinations!',
          start_date: new Date('2024-08-01T00:00:00.000Z'),
          end_date: new Date('2024-08-31T23:59:59.999Z'),
          target: 100,
          fk_Groupid: 5
        },
        {
          title: '50-Mile Running Challenge',
          description: 'Run 50 miles within a month and push your limits!',
          start_date: new Date('2024-09-01T00:00:00.000Z'),
          end_date: new Date('2024-09-30T23:59:59.999Z'),
          target: 50,
          fk_Groupid: 6
        },
        {
          title: '100-Burpee Challenge',
          description: 'Complete 100 burpees within a month and boost your cardiovascular endurance!',
          start_date: new Date('2024-10-01T00:00:00.000Z'),
          end_date: new Date('2024-10-31T23:59:59.999Z'),
          target: 100,
          fk_Groupid: 7
        },
        {
          title: '200-Meter Swimming Sprint Challenge',
          description: 'Swim 200 meters as fast as you can and improve your swimming speed!',
          start_date: new Date('2024-11-01T00:00:00.000Z'),
          end_date: new Date('2024-11-30T23:59:59.999Z'),
          target: 200,
          fk_Groupid: 8
        },
        {
          title: '30-Day Jump Rope Challenge',
          description: 'Jump rope for 30 days straight and improve your coordination and endurance!',
          start_date: new Date('2024-12-01T00:00:00.000Z'),
          end_date: new Date('2024-12-31T23:59:59.999Z'),
          target: 30,
          fk_Groupid: 9
        },
        {
          title: 'Handstand Challenge',
          description: 'Master the art of the handstand within a month. Strengthen your core and improve balance!',
          start_date: new Date('2025-01-01T00:00:00.000Z'),
          end_date: new Date('2025-01-31T23:59:59.999Z'),
          target: 1,
          fk_Groupid: 10
        },
        {
          title: '100-Mile Cycling Tour Challenge',
          description: 'Embark on a 100-mile cycling tour and explore scenic routes!',
          start_date: new Date('2025-02-01T00:00:00.000Z'),
          end_date: new Date('2025-02-28T23:59:59.999Z'),
          target: 100,
          fk_Groupid: 11
        },
        {
          title: 'Spartan Race Training Challenge',
          description: 'Train like a Spartan and prepare for the ultimate obstacle course race!',
          start_date: new Date('2025-03-01T00:00:00.000Z'),
          end_date: new Date('2025-03-31T23:59:59.999Z'),
          target: 1,
          fk_Groupid: 7
        },
        {
          title: '200-Kilometer Trail Running Challenge',
          description: 'Conquer 200 kilometers of rugged trails and embrace the wilderness!',
          start_date: new Date('2025-04-01T00:00:00.000Z'),
          end_date: new Date('2025-04-30T23:59:59.999Z'),
          target: 200,
          fk_Groupid: 5
        },
        {
          title: '50-Meter Freestyle Swimming Challenge',
          description: 'Swim 50 meters freestyle as fast as you can and improve your sprinting speed!',
          start_date: new Date('2025-05-01T00:00:00.000Z'),
          end_date: new Date('2025-05-31T23:59:59.999Z'),
          target: 50,
          fk_Groupid: 8
        },
        {
          title: 'Mountain Climbing Challenge',
          description: 'Summit a challenging mountain peak and conquer your fears!',
          start_date: new Date('2025-06-01T00:00:00.000Z'),
          end_date: new Date('2025-06-30T23:59:59.999Z'),
          target: 1,
          fk_Groupid: 12
        }
      ],
    });

    // Group members
    await prisma.groupMember.createMany({
      data: [
        { groupId: 1, userId: 5 },
        { groupId: 1, userId: 6 },
        { groupId: 2, userId: 4 },
        { groupId: 2, userId: 7 },
        { groupId: 3, userId: 3 },
        { groupId: 3, userId: 8 },
        { groupId: 4, userId: 1 },
        { groupId: 4, userId: 2 },
        { groupId: 5, userId: 9 },
        { groupId: 5, userId: 10 },
        { groupId: 6, userId: 11 },
        { groupId: 6, userId: 12 },
        { groupId: 7, userId: 13 },
        { groupId: 7, userId: 14 },
        { groupId: 8, userId: 15 },
        { groupId: 8, userId: 16 },
        { groupId: 9, userId: 1 },
        { groupId: 9, userId: 2 },
        { groupId: 10, userId: 3 },
        { groupId: 10, userId: 4 },
        { groupId: 11, userId: 5 },
        { groupId: 11, userId: 6 },
        { groupId: 12, userId: 7 },
        { groupId: 12, userId: 8 },
        { groupId: 13, userId: 9 },
        { groupId: 13, userId: 10 },
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
        {
          sleep_duration: "7",
          calories_intake: "1600",
          macroelements_intake: "1200",
          water_intake: "2.1",
          weight: "86",
          fk_UserId: 1,
          date: new Date()
        },
        // User 2
        {
          sleep_duration: "8",
          calories_intake: "1800",
          macroelements_intake: "1300",
          water_intake: "2.0",
          weight: "82",
          fk_UserId: 2,
          date: new Date()
        },
        // User 3
        {
          sleep_duration: "6",
          calories_intake: "1500",
          macroelements_intake: "1100",
          water_intake: "2.2",
          weight: "78",
          fk_UserId: 3,
          date: new Date()
        },
        // User 4
        {
          sleep_duration: "7",
          calories_intake: "1700",
          macroelements_intake: "1250",
          water_intake: "2.5",
          weight: "84",
          fk_UserId: 4,
          date: new Date()
        },
        // User 5
        {
          sleep_duration: "7",
          calories_intake: "1600",
          macroelements_intake: "1200",
          water_intake: "2.1",
          weight: "86",
          fk_UserId: 5,
          date: new Date()
        },
        // User 6
        {
          sleep_duration: "8",
          calories_intake: "1800",
          macroelements_intake: "1300",
          water_intake: "2.0",
          weight: "82",
          fk_UserId: 6,
          date: new Date()
        },
        // User 7
        {
          sleep_duration: "6",
          calories_intake: "1500",
          macroelements_intake: "1100",
          water_intake: "2.2",
          weight: "78",
          fk_UserId: 7,
          date: new Date()
        },
        // User 8
        {
          sleep_duration: "7",
          calories_intake: "1700",
          macroelements_intake: "1250",
          water_intake: "2.5",
          weight: "84",
          fk_UserId: 8,
          date: new Date()
        },
        // User 9
        {
          sleep_duration: "7",
          calories_intake: "1600",
          macroelements_intake: "1200",
          water_intake: "2.1",
          weight: "86",
          fk_UserId: 9,
          date: new Date()
        },
        // User 10
        {
          sleep_duration: "8",
          calories_intake: "1800",
          macroelements_intake: "1300",
          water_intake: "2.0",
          weight: "82",
          fk_UserId: 10,
          date: new Date()
        },
        // User 11
        {
          sleep_duration: "6",
          calories_intake: "1500",
          macroelements_intake: "1100",
          water_intake: "2.2",
          weight: "78",
          fk_UserId: 11,
          date: new Date()
        },
        // User 12
        {
          sleep_duration: "7",
          calories_intake: "1700",
          macroelements_intake: "1250",
          water_intake: "2.5",
          weight: "84",
          fk_UserId: 12,
          date: new Date()
        },
        // User 13
        {
          sleep_duration: "7",
          calories_intake: "1600",
          macroelements_intake: "1200",
          water_intake: "2.1",
          weight: "86",
          fk_UserId: 13,
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