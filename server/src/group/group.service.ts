import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Group, Invitation, User, Goal, Event, EventComment, Challenge, ChallengeParticipation } from '@prisma/client';
import { CreateGroupDto } from './dto/create-group.dto';
import { MailService } from './mail/mail.service';
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { SendInvitationDto } from './dto/send-invitation.dto';
import { UserService } from '../user/user.service';
import { CreateGoalDto } from './dto/create-goal.dto';
import { CreateEventDto } from './dto/create-event.dto';
import { CreateChallengeDto } from './dto/create-challenge.dto';

@Injectable()
export class GroupService {
  constructor(private prisma: PrismaService, private mailService: MailService, private jwt: JwtService, private config: ConfigService,
    private userService: UserService
  ) { }

  async createGroup(createGroupDto: CreateGroupDto, groupFN, bannerFN): Promise<Group> {
    const { name, description, mentorId, visibilityId } = createGroupDto;
    return this.prisma.group.create({
      data: {
        name,
        description,
        mentorId,
        visibilityId,
        image_url: groupFN,
        banner_url: bannerFN
      },
    });
  }

  async updateGroup(groupId: number, updateGroupDto: CreateGroupDto, groupFN, bannerFN): Promise<Group> {
    const { name, description, visibilityId } = updateGroupDto;

    const dataToUpdate: any = {
      name,
      description,
      visibilityId
    };

    if (groupFN !== null) {
      dataToUpdate.image_url = groupFN;
    }

    if (bannerFN !== null) {
      dataToUpdate.banner_url = bannerFN;
    }

    return this.prisma.group.update({
      where: {
        id: groupId,
      },
      data: dataToUpdate,
    });
  }

  async findGroupById(groupId: number): Promise<Group | null> {
    return this.prisma.group.findUnique({
      where: {
        id: groupId,
      },
    });
  }

  async findAll(): Promise<Group[]> {
    return this.prisma.group.findMany();
  }

  async findPublicVisibilityId(): Promise<number | null> {
    try {
      const publicVisibility = await this.prisma.groupVisibility.findFirst({
        where: {
          name: 'public'
        }
      });

      return publicVisibility?.id ?? null;
    } catch (error) {
      console.error('Error finding public visibility:', error);
      return null;
    }
  }

  async findAllPublicGroups(): Promise<Group[]> {
    const publicVisibilityId = await this.findPublicVisibilityId();

    if (publicVisibilityId !== null) {
      return this.prisma.group.findMany({
        where: {
          visibilityId: publicVisibilityId
        },
        include: {
          groupMembers: {
            include: {
              user: {
                select: {
                  username: true,
                  colourHex: true
                }
              }
            }
          },
          mentor: {
            select: {
              username: true,
              colourHex: true
            }
          }
        }
      });
    } else {
      return [];
    }
  }

  async findCurrentUserGroups(userId: number): Promise<Group[]> {
    return this.prisma.group.findMany({
      where: {
        OR: [
          { mentorId: userId },
          { groupMembers: { some: { userId } } }
        ]
      },
      include: {
        groupMembers: {
          include: {
            user: {
              select: {
                username: true,
                colourHex: true
              }
            }
          }
        },
        mentor: {
          select: {
            username: true
          }
        }
      }
    });
  }

  async addUserToGroup(userId: number, groupId: number): Promise<void> {
    try {
      await this.prisma.groupMember.create({
        data: {
          groupId: groupId,
          userId: userId,
        },
      });
    } catch (error) {
      console.error('Error adding member to the group:', error);
    }
  }

  async sendInvitation(dto: SendInvitationDto, userId: number): Promise<boolean> {
    try {
      const group = await this.prisma.group.findUnique({
        where: { id: dto.groupId },
      });

      if (!group) {
        throw new NotFoundException('Group not found.');
      }

      if (group.mentorId !== userId) {
        throw new ForbiddenException('You are not the mentor of this group.');
      }

      const user = await this.prisma.user.findUnique({
        where: { email: dto.userEmail },
      });

      if (!user) {
        throw new NotFoundException('User not found.');
      }

      const token = await this.inviteToken(group.id, user.email);

      await this.prisma.invitation.create({
        data: {
          token: token,
          user: { connect: { id: user.id } },
          group: { connect: { id: group.id } },
        },
      });

      await this.mailService.sendGroupInvitation(user, group.name, token);
      return true;
    } catch (e) {
      throw e;
    }
  }

  async inviteToken(groupId: number, email: string) {
    const payload = {
      sub: groupId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '60m',
      secret: secret,
    });

    return token;
  }

  async validateInvitationToken(token: string): Promise<{ groupId: number | null, userId: number | null }> {
    try {
      const invitation = await this.prisma.invitation.findFirst({
        where: { token: { equals: token } },
      });

      if (!invitation) {
        throw new NotFoundException('Invitation not found.');
      }

      const currentTime = new Date();
      const expiryTime = new Date(invitation.date_sent);
      expiryTime.setMinutes(expiryTime.getMinutes() + invitation.expiryDuration);

      if (currentTime > expiryTime) {
        throw new Error('Invitation token has expired.');
      }

      if (invitation.fk_GroupId && invitation.fk_UserId) {
        await this.prisma.invitation.update({
          where: { id: invitation.id },
          data: {
            date_responded: new Date(),
            invitationStatus: 2,
          },
        });
      }

      return { groupId: invitation.fk_GroupId, userId: invitation.fk_UserId };
    } catch (error) {
      throw error;
    }
  }

  async findGroupAndUserByToken(token: string): Promise<{ group: Group | null, user: User | null }> {
    const invitation = await this.prisma.invitation.findFirst({ where: { token } });

    if (!invitation) {
      return { group: null, user: null };
    }

    const group = await this.findGroupById(invitation.fk_GroupId);
    const user = await this.userService.getUserById(invitation.fk_UserId);

    return { group, user };
  }

  async createChallenge(createChallengeDto: CreateChallengeDto, groupId: number): Promise<Challenge> {
    const { title, description, start_date, end_date } =
      createChallengeDto;

    const targetValue = parseInt(createChallengeDto.target.toString(), 10);

    return this.prisma.challenge.create({
      data: {
        title,
        description,
        start_date,
        end_date,
        target: targetValue,
        group: { connect: { id: groupId } },
      },
    });
  }

  async createGoal(createGoalDto: CreateGoalDto, groupId: number): Promise<Goal> {
    const { title, description, start_date, end_date, statusId, categoryId } = createGoalDto;

    const targetValue = parseInt(createGoalDto.target_value.toString(), 10);

    return this.prisma.goal.create({
      data: {
        title,
        description,
        start_date,
        end_date,
        target_value: targetValue,
        current_value: 0,
        status: statusId ? { connect: { id: statusId } } : undefined,
        category: categoryId ? { connect: { id: categoryId } } : undefined,
        group: { connect: { id: groupId } },
      },
    });
  }

  async createEvent(createEventDto: CreateEventDto, groupId: number): Promise<Event> {
    const { title, description, date, location, fk_Category } =
      createEventDto;

    return this.prisma.event.create({
      data: {
        title,
        description,
        date,
        location,
        category: fk_Category ? { connect: { id: fk_Category } } : undefined,
        group: { connect: { id: groupId } },
      },
    });
  }

  async getEvents(groupId: number): Promise<Event[]> {
    return this.prisma.event.findMany({
      where: {
        fk_GroupId: groupId
      },
      include: {
        participants: true
      }
    });
  }


  async getEventComments(eventId: number) {
    try {
      const comments = await this.prisma.eventComment.findMany({
        where: {
          eventId: eventId,
        },
        include: {
          createdBy: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      return comments;
    } catch (error) {
      throw new Error(`Failed to fetch event comments: ${error.message}`);
    }
  }

  async createEventComment(eventId: number, userId: number, content: string): Promise<EventComment> {
    return this.prisma.eventComment.create({
      data: {
        eventId,
        userId,
        content,
      },
    });
  }

  async participateInEvent(userId: number, eventId: number): Promise<void> {
    try {
      const existingParticipant = await this.prisma.event.findUnique({
        where: {
          id: eventId,
        },
        select: {
          participants: {
            where: {
              id: userId,
            },
          },
        },
      });

      if (existingParticipant) {
        //throw new Error('User is already participating in the event');
      }

      await this.prisma.event.update({
        where: {
          id: eventId,
        },
        data: {
          participants: {
            connect: {
              id: userId,
            },
          },
        },
      });
    } catch (error) {
      throw new Error('Failed to participate in event: ' + error.message);
    }
  }

  async cancelEventParticipation(eventId: number, userId: number): Promise<void> {
    await this.prisma.event.update({
      where: { id: eventId },
      data: { participants: { disconnect: { id: userId } } },
    });
  }

  async cancelChallengeParticipation(challengeId: number, userId: number): Promise<void> {
    const existingParticipation = await this.prisma.challengeParticipation.findFirst({
      where: {
        userId,
        challengeId,
      },
    });

    if (existingParticipation) {
      await this.prisma.challengeParticipation.delete({
        where: {
          id: existingParticipation.id,
        },
      });
    }
  }

  async isUserParticipatingInEvent(eventId: number, userId: number): Promise<{ isParticipating: boolean }> {
    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
      include: { participants: { where: { id: userId } } },
    });

    return { isParticipating: !!event?.participants.length };
  }

  async isUserParticipatingInChallenge(challengeId: number, userId: number): Promise<{ isParticipating: boolean }> {
    const existingParticipation = await this.prisma.challengeParticipation.findFirst({
      where: {
        userId,
        challengeId,
      },
    });

    return {
      isParticipating: !!existingParticipation,
    };
  }

  async getGoals(groupId: number): Promise<Goal[]> {
    const goals = await this.prisma.goal.findMany({
      where: {
        fk_Groupid: groupId,
      },
      include: {
        category: {
          select: {
            name: true,
          },
        },
        status: {
          select: {
            name: true,
          },
        },
      },
    });

    const updatedGoals = await Promise.all(goals.map(async (goal) => {
      const progress = await this.calculateProgress(groupId, goal.target_value);
      return {
        ...goal,
        progress,
      };
    }));

    return updatedGoals;
  }
  async calculateProgress(groupId: number, requiredSteps: number) {
    const groupUsers = await this.prisma.group.findUnique({
      where: {
        id: groupId
      },
      include: {
        groupMembers: true
      }
    })

    const userIds = groupUsers.groupMembers.map(user => {
      return user.userId
    })



    userIds.push(groupUsers.mentorId);

    let stepcount = 0;

    await Promise.all(userIds.map(async (id) => {
      const userActivities = await this.prisma.activityEntry.findMany({
        where: {
          fk_Userid: id
        }
      });
      userActivities.forEach(activity => {
        stepcount += activity.steps;
      });
    }));

    const progress = stepcount / requiredSteps * 100;
    if (progress > 100) {
      return 100;
    }

    return progress
  }

  async getChallenges(groupId: number): Promise<Challenge[]> {
    return this.prisma.challenge.findMany({
      where: {
        fk_Groupid: groupId
      }
    });
  }

  async markChallengeParticipation(
    userId: number,
    challengeId: number,
    progress: number,
  ): Promise<ChallengeParticipation> {
    const challenge = await this.prisma.challenge.findUnique({
      where: {
        id: challengeId,
      },
    });

    if (!challenge) {
      throw new Error(`Challenge with ID ${challengeId} not found.`);
    }

    const existingParticipation = await this.prisma.challengeParticipation.findFirst({
      where: {
        userId: userId,
        challengeId: challengeId,
      },
    });

    if (existingParticipation) {
      // Jei challenge jau ivykdytas, daugiau nenaujint ivykdymo datos
      const isCompleted = existingParticipation.progress >= challenge.target;
      return this.prisma.challengeParticipation.update({
        where: {
          id: existingParticipation.id,
        },
        data: {
          progress,
          completionDate: isCompleted ? existingParticipation.completionDate :
            progress >= challenge.target ? new Date() : null,
        },
      });
    } else {
      return this.prisma.challengeParticipation.create({
        data: {
          userId,
          challengeId,
          progress,
          completionDate: progress >= challenge.target ? new Date() : null,
        },
      });
    }
  }

  async getChallengeParticipants(cid: number): Promise<ChallengeParticipation[]> {
    return this.prisma.challengeParticipation.findMany({
      where: {
        challengeId: cid,
      },
      include: {
        user: true,
      },
    });
  }


  async getGroupInfo(groupId: number) {
    try {
      const groupInfo = await this.prisma.group.findUnique({
        where: {
          id: groupId,
        },
        include: {
          groupMembers: {
            include: {
              user: {
                select: {
                  username: true,
                  profile_picture: true
                }
              }
            }
          },
          mentor: {
            select: {
              username: true,
              profile_picture: true
            }
          }
        }
      });
      return groupInfo;
    }
    catch (error) {
      console.log(error);
    }
  }
}