import { Controller, Get, Post, Body, HttpStatus, HttpException, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
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
}
