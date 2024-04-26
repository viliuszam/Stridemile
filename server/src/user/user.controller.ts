import {Body, Controller, Delete, Get, Param, Post, Req, UseGuards, HttpException, HttpStatus} from "@nestjs/common";
import { UserService } from "./user.service";
import { AuthGuard } from "@nestjs/passport";
import { Request } from 'express';

@Controller('users')
export class UserController {

    constructor(private userService: UserService){}

    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    getMe(@Req() req: Request) {
        return req.user;
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('users/:userId/last-seen')
    async getLastSeenLocation(@Param('userId') userId: number) {
      return this.userService.getLastSeenLocation(userId);
    }

    @Get(':id')
    async getUserById(@Param('id') id: string) {
        try {
            const user = await this.userService.getUserById(parseInt(id));
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        } catch (error) {
            throw new Error('Error fetching user details: ' + error.message);
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('change-username')
    async changeUsername(@Body() data: { username: string }, @Req() req) {
      try {
        const userId = req.user.id;
        await this.userService.changeUsername(userId, data.username);
        return { success: true, message: 'Username changed successfully' };
      } catch (error) {
        if (error.message === 'Username is already taken') {
          throw new HttpException('Username is already taken', HttpStatus.BAD_REQUEST);
        } else {
          throw new HttpException('An error occurred while changing the username', HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('leaderboard/top10')
    async getTop10UsersByPoints(@Req() req) {
      const userId = req.user.id;
      try {
        return this.userService.getTop10UsersByPoints(userId);
      } catch (error) {
        console.log(error);
      }
    }

    
  @UseGuards(AuthGuard('jwt'))
  @Get('popup/:userId')
  async getUserPopupInfo(@Param('userId') userId: number, @Req() req): Promise<any> {
    const requestingUserId = req.user.id;
    return this.userService.getUserPopupInfo(parseInt(userId.toString()), requestingUserId);
  }
}
