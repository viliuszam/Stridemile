import { Controller, Get, Param, Post, Body, HttpStatus, HttpException, NotFoundException, UseGuards, Delete, Request, UseInterceptors, UploadedFiles, ParseIntPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { SendInvitationDto } from './dto/send-invitation.dto';
import { CreateGoalDto } from './dto/create-goal.dto';
import { ChallengeParticipation, Group } from '@prisma/client';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import path = require('path');
import { v4 as uuidv4 } from 'uuid';
import { diskStorage, Multer } from 'multer';
import { CreateEventDto } from './dto/create-event.dto';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { ParticipateChallengeDto } from './dto/participate-challenge.dto';

@Controller('groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('createGroup')
  @UseInterceptors(AnyFilesInterceptor({
    storage: diskStorage({
      destination: (req, file, cb) => {
        var destination = ""
        if(file.fieldname == 'imageGroupFile'){
          destination = './uploads/groupimages'
        }else{
          destination = './uploads/bannerimages'
        }
        cb(null, destination);
      },
      filename: (req, file, cb) => {
        const filename: string =
          path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
        const extension: string = path.parse(file.originalname).ext;
  
        cb(null, `${filename}${extension}`);
      },
    }),
  }))
  async createGroup(@UploadedFiles() files: Array<Multer.File>, @Request() req) {
    try {
      const userId = req.user.id;
      var {name, description, mentorId, visibilityId } = req.body;
      
      mentorId = userId;
      var bannerFN = null;
      var groupFN = null;

      for(let i = 0; i < files.length; i++){
        if(files[i].fieldname == 'imageGroupFile'){
          groupFN = process.env.GROUP_PHOTO_PATH + files[i].filename;
          console.log(groupFN);
        }
        if(files[i].fieldname == 'imageBannerFile'){
          bannerFN = process.env.BANNER_PHOTO_PATH + files[i].filename;
          console.log(bannerFN);
        }
      }
      
      const createGroupDto: CreateGroupDto = {
        name,
        description,
        mentorId: parseInt(mentorId),
        visibilityId: parseInt(visibilityId),
      };

      const createdGroup = await this.groupService.createGroup(createGroupDto, groupFN, bannerFN);

      // bugfix: mentor isn't in the list of group members
      await this.groupService.addUserToGroup(createGroupDto.mentorId, createdGroup.id);

      return {
        message: 'Group created successfully',
        group: createdGroup,
      };
    } catch (error) {
      console.log(error);
    }
  }
  
  @UseGuards(AuthGuard('jwt'))
  @Post(':edit-group/:groupId')
  @UseInterceptors(AnyFilesInterceptor({
    storage: diskStorage({
      destination: (req, file, cb) => {
        var destination = ""
        if(file.fieldname == 'imageGroupFile'){
          destination = './uploads/groupimages'
        }else{
          destination = './uploads/bannerimages'
        }
        cb(null, destination);
      },
      filename: (req, file, cb) => {
        const filename: string =
          path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
        const extension: string = path.parse(file.originalname).ext;
  
        cb(null, `${filename}${extension}`);
      },
    }),
  }))
  async updateGroup(
    @Param('groupId') groupId: number, @UploadedFiles() files: Array<Multer.File>, @Request() req) {
    try {

      var {name, description, visibilityId } = req.body;

      var bannerFN = null;
      var groupFN = null;
      
      for(let i = 0; i < files.length; i++){
        if(files[i].fieldname == 'imageGroupFile'){
          groupFN = process.env.GROUP_PHOTO_PATH + files[i].filename;
          console.log(groupFN);
        }
        if(files[i].fieldname == 'imageBannerFile'){
          bannerFN = process.env.BANNER_PHOTO_PATH + files[i].filename;
          console.log(bannerFN);
        }
      }

      const updateGroupDto: CreateGroupDto = {
        name,
        description,
        mentorId: null,
        visibilityId: parseInt(visibilityId),
      };

      const gid = parseInt(groupId.toString(), 10); // ??? kodel jis ne number by default nors tipas number
      const updatedGroup = await this.groupService.updateGroup(gid, updateGroupDto, groupFN, bannerFN);
      return {
        message: 'Group updated successfully',
        group: updatedGroup,
      };
    } catch (error) {
      console.log(error);
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

  @Get('/:challengeId/challenge-participants')
  async getChallengeParticipants(
    @Param('challengeId') challengeId: number,
  ): Promise<ChallengeParticipation[]> {
    return this.groupService.getChallengeParticipants(parseInt(challengeId.toString()));
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('userGroups')
  async findUserGroups(@Request() req) {
    const userId = req.user.id;
    return this.groupService.findCurrentUserGroups(userId);
  }

  @Post(':challengeId/challenge-participate')
  @UseGuards(AuthGuard('jwt'))
  async markChallengeParticipation(
    @Request() req,
    @Param('challengeId') challengeId: number) 
    {
    const userId = req.user.id;
    const cid = parseInt(challengeId.toString()); //???

    return this.groupService.markChallengeParticipation(
      userId,
      cid,
      0
    );
  }

  @Post('sendInvitation')
  @UseGuards(AuthGuard('jwt'))
  async sendInvitation(@Body() sendInvitationDto: SendInvitationDto, @Request() req) {
    try {
      const { groupId, userEmail } = sendInvitationDto;
      const userId = req.user.id;

      const invitationSent = await this.groupService.sendInvitation(sendInvitationDto, userId);

      if (invitationSent) {
        return { message: 'Invitation sent successfully' };
      } else {
        throw new NotFoundException('User or group not found');
      }
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':groupId/createGoal')
  async createGoal(@Body() createGoalDto: CreateGoalDto, @Request() req, @Param('groupId') groupId: number) {
    const userId = req.user.id;
    const gid = parseInt(groupId.toString(), 10); // ??? kodel jis ne number by default nors tipas number
    try {
      const group = await this.groupService.findGroupById(gid);
      if (!group) {
        throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
      }

      if (group.mentorId !== userId) {
        throw new HttpException(
          'You are not authorized to create goals for this group',
          HttpStatus.FORBIDDEN,
        );
      }

      const goal = await this.groupService.createGoal(createGoalDto, gid);
      return { message: 'Goal created successfully', goal };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':groupId/createEvent')
  async createEvent(@Body() createEventDto: CreateEventDto, @Request() req, @Param('groupId') groupId: number) {
    const userId = req.user.id;
    const gid = parseInt(groupId.toString(), 10);
    try {
      const group = await this.groupService.findGroupById(gid);
      if (!group) {
        throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
      }

      if (group.mentorId !== userId) {
        throw new HttpException(
          'You are not authorized to create events for this group',
          HttpStatus.FORBIDDEN,
        );
      }

      const goal = await this.groupService.createEvent(createEventDto, gid);
      return { message: 'Event created successfully', goal };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':groupId/createChallenge')
  async createChallenge(@Body() createChallengeDto: CreateChallengeDto, @Request() req, @Param('groupId') groupId: number) {
    const userId = req.user.id;
    const gid = parseInt(groupId.toString(), 10);
    try {
      const group = await this.groupService.findGroupById(gid);
      if (!group) {
        throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
      }

      if (group.mentorId !== userId) {
        throw new HttpException(
          'You are not authorized to create challenges for this group',
          HttpStatus.FORBIDDEN,
        );
      }

      const goal = await this.groupService.createChallenge(createChallengeDto, gid);
      return { message: 'Challenge created successfully', goal };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':groupId/events')
  async getAllEvents(@Request() req, @Param('groupId') groupId: number) {
    const gid = parseInt(groupId.toString(), 10);
    try {
      const group = await this.groupService.findGroupById(gid);
      if (!group) {
        throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
      }
  
      const userGroups = await this.groupService.findCurrentUserGroups(req.user.id);
      const userIsMember = userGroups.some(group => group.id === gid);
      if (!userIsMember && group.visibilityId == 2) {
        throw new HttpException(
          'You are not a member of this group and cannot view its events',
          HttpStatus.FORBIDDEN,
        );
      }
  
      const events = await this.groupService.getEvents(gid);
      return { events };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('getAllGroupsEvents')
  async getAllGroupsEvents(@Request() req) {
    try {
      const userGroups = await this.groupService.findCurrentUserGroups(req.user.id);

      const events = await Promise.all(
        userGroups.map(group => this.groupService.getEvents(group.id))
      );
  
      return { events: events.flat() };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':eventId/event-comments')
  async getEventComments(@Request() req, @Param('eventId') eventId: number) {
    const eid = parseInt(eventId.toString(), 10);
    try {
      const comments = await this.groupService.getEventComments(eid);
      return { comments };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':eventId/event-participate')
  async participateInEvent(@Request() req, @Param('eventId') eventId: number) {
    try {
      const userId = req.user.id;
      const eid = parseInt(eventId.toString(), 10);
      
      await this.groupService.participateInEvent(userId, eid);
      
      return { message: 'Participation successful' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':eventId/event-cancel-participation')
  async cancelEventParticipation(@Request() req,@Param('eventId') eventId: number) {
    try {
      const userId = req.user.id;
      const eid = parseInt(eventId.toString(), 10);

      await this.groupService.cancelEventParticipation(eid, userId);

      return { message: 'Participation cancel successful' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':challengeId/challenge-cancel-participation')
  async cancelChallengeParticipation(@Request() req,@Param('challengeId') challengeId: number) {
    try {
      const userId = req.user.id;
      const cid = parseInt(challengeId.toString(), 10);

      await this.groupService.cancelChallengeParticipation(cid, userId);

      return { message: 'Participation cancel successful' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':challengeId/user-challenge-participation')
  async checkUserChallengeParticipation(@Request() req, @Param('challengeId') challengeId: number): Promise<{ isParticipating: boolean }> {
    try {
      const userId = req.user.id;
      const cid = parseInt(challengeId.toString(), 10);

      return this.groupService.isUserParticipatingInChallenge(cid, userId);

    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':eventId/user-event-participation')
  async checkUserEventParticipation(@Request() req, @Param('eventId') eventId: number): Promise<{ isParticipating: boolean }> {
    try {
      const userId = req.user.id;
      const eid = parseInt(eventId.toString(), 10);

      return this.groupService.isUserParticipatingInEvent(eid, userId);

    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':eventId/post-comment')
  async postComment(@Request() req, @Param('eventId') eventId: number) {
    const eid = parseInt(eventId.toString(), 10);
    try {
      const { content } = req.body;
      const userId = req.user.id;
      const comment = await this.groupService.createEventComment(eid, userId, content);
      return { comment };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':groupId/goals')
  async getAllGoals(@Request() req, @Param('groupId') groupId: number) {
    const userId = req.user.id;
    const gid = parseInt(groupId.toString(), 10);
    try {
      const group = await this.groupService.findGroupById(gid);
      if (!group) {
        throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
      }
  
      const userGroups = await this.groupService.findCurrentUserGroups(req.user.id);
      const userIsMember = userGroups.some(group => group.id === gid);
      if (!userIsMember && group.visibilityId == 2) {
        throw new HttpException(
          'You are not a member of this group and cannot view its goals',
          HttpStatus.FORBIDDEN,
        );
      }
  
      const goals = await this.groupService.getGoals(gid);
      return { goals };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('getAllGroupsGoals')
  async getAllGroupsGoals(@Request() req) {
    try {
      const userGroups = await this.groupService.findCurrentUserGroups(req.user.id);

      const goals = await Promise.all(
        userGroups.map(group => this.groupService.getGoals(group.id))
      );
  
      return { goals: goals.flat() };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':groupId/challenges')
  async getAllChallenges(@Request() req, @Param('groupId') groupId: number) {
    const gid = parseInt(groupId.toString(), 10);
    try {
      const group = await this.groupService.findGroupById(gid);
      if (!group) {
        throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
      }
  
      const userGroups = await this.groupService.findCurrentUserGroups(req.user.id);
      const userIsMember = userGroups.some(group => group.id === gid);
      if (!userIsMember && group.visibilityId == 2) {
        throw new HttpException(
          'You are not a member of this group and cannot view its challenges',
          HttpStatus.FORBIDDEN,
        );
      }
  
      const challenges = await this.groupService.getChallenges(gid);
      return { challenges };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('getAllGroupsChallenges')
  async getAllGroupsChallenges(@Request() req) {
    try {
      const userGroups = await this.groupService.findCurrentUserGroups(req.user.id);

      const challenges = await Promise.all(
        userGroups.map(group => this.groupService.getChallenges(group.id))
      );
  
      return { challenges: challenges.flat() };
    } catch (error) {
      throw new HttpException(error.message, error.status);
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

  @UseGuards(AuthGuard('jwt'))
  @Get('group/:groupId')
  async getGroupInfo(@Param('groupId', ParseIntPipe) groupId: number){
    const group = await this.groupService.getGroupInfo(groupId);
    return group;
  }
}