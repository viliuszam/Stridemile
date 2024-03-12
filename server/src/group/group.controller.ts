import { Controller, Get, Param, Post, Body, HttpStatus, HttpException, NotFoundException, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { SendInvitationDto } from './dto/send-invitation.dto';
import { Group } from '@prisma/client';

@Controller('groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('createGroup')
  async createGroup(@Body() createGroupDto: CreateGroupDto, @Request() req) {
    try {
      const userId = req.user.id;
      createGroupDto.mentorId = userId;
      
      const createdGroup = await this.groupService.createGroup(createGroupDto);
      return {
        message: 'Group created successfully',
        group: createdGroup,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Internal Server Error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('publicGroups')
  async getAllPublicGroups(): Promise<Group[]> {
    try {
      return await this.groupService.findAllPublicGroups();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Internal Server Error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('userGroups')
  async findUserGroups(@Request() req) {
    const userId = req.user.id;
    return this.groupService.findCurrentUserGroups(userId);
  }

  @Post('sendInvitation')
  async sendInvitation(@Body() sendInvitationDto: SendInvitationDto) {
    try {
      const { groupId, userEmail } = sendInvitationDto;

      const invitationSent = await this.groupService.sendInvitation(sendInvitationDto);

      if (invitationSent) {
        return { message: 'Invitation sent successfully' };
      } else {
        throw new NotFoundException('User or group not found');
      }
    } catch (error) {
      throw error;
    }
  }

  @Post('joinGroup')
  async handleInvitation(@Body() body: { token: string }) {
    const { token } = body;

    try {
      const { groupId, userId } = await this.groupService.validateInvitationToken(token);

      if (!groupId || !userId) {
        throw new Error('Invalid invitation token');
      }

      await this.groupService.addUserToGroup(userId, groupId);

      return {
        statusCode: HttpStatus.OK,
        message: 'You have joined the group successfully!',
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: error.message,
      };
    }
  }

  @Get(':token')
  async findGroupIdAndUserIdByToken(@Param('token') token: string) {
    const result = await this.groupService.findGroupAndUserByToken(token);
    if (!result) {
      return { statusCode: HttpStatus.NOT_FOUND, message: 'Invitation not found' };
    }
    return { statusCode: HttpStatus.OK, data: result };
  }
}
