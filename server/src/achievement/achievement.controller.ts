import {Body, Controller, Delete, Get, Param, Post, Req, UseGuards, Request} from "@nestjs/common";
import { AchievementService } from "./achievement.service";
import { AuthGuard } from "@nestjs/passport";

@Controller('achievements')
export class AchievementController {

    constructor(private achievementService: AchievementService){}

    @UseGuards(AuthGuard('jwt'))
    @Get('all')
    getAll(@Request() req) {
        const userId = req.user.id;
        return this.achievementService.getAllAchievements(userId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('userAchievements')
    async checkAchievements(@Request() req){
        const userId = req.user.id;
        return this.achievementService.checkForUserAchievements(userId);
  }

    @UseGuards(AuthGuard('jwt'))
    @Get('points')
    getPoints(@Request() req) {
        return this.achievementService.getPoints(req.user.id);
    }
}