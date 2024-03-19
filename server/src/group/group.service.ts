import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Group, Invitation, User, Goal } from '@prisma/client';
import { CreateGroupDto } from './dto/create-group.dto';
import { MailService } from './mail/mail.service';
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { SendInvitationDto } from './dto/send-invitation.dto';
import { UserService } from '../user/user.service';
import { CreateGoalDto } from './dto/create-goal.dto';

@Injectable()
export class GroupService {
  constructor(private prisma: PrismaService, private mailService: MailService, private jwt: JwtService, private config: ConfigService,
    private userService: UserService
    ) {}

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
                  username: true
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
                username: true
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
        where: { email: dto.userEmail  },
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

  async createGoal(createGoalDto: CreateGoalDto, groupId: number): Promise<Goal> {
    const { title, description, start_date, end_date, target_value, statusId, categoryId } =
      createGoalDto;

    return this.prisma.goal.create({
      data: {
        title,
        description,
        start_date,
        end_date,
        target_value,
        status: statusId ? { connect: { id: statusId } } : undefined,
        category: categoryId ? { connect: { id: categoryId } } : undefined,
        group: { connect: { id: groupId } },
      },
    });
  }

  async getGroupInfo(groupId: number){
    try{
      const groupInfo = await this.prisma.group.findUnique({
        where: {
          id: groupId,
        }
      });
      return groupInfo;
    }
    catch (error){
      console.log(error);
    }
    
  }

}
