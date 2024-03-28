import {Body, Controller, Delete, Get, Param, Post, Req, UseGuards, Request} from "@nestjs/common";
import { RewardService } from "./reward.service";
import { AuthGuard } from "@nestjs/passport";
import { AchievementService } from "src/achievement/achievement.service";

@Controller('rewards')
export class RewardController {

    constructor(private rewardService: RewardService, private achievementService: AchievementService){}

    @UseGuards(AuthGuard('jwt'))
    @Post('update')
    async UpdateRewards(@Request() req){
        const userId = req.user.id;
        const points = await this.achievementService.getPoints(userId)
        return this.rewardService.UpdateRewards(userId, points.userPoints);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('applyCustomisation')
    async ApplyCustomiastion(@Request() req){
        const userId = req.user.id;
        const colourHex = req.body.hexColour
        return this.rewardService.ApplyCustomisation(userId, colourHex);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('unlockedColours')
    async GetColours(@Request() req){
        const userId = req.user.id;
        const unlockedColours = await this.rewardService.UserColours(userId);
        console.log(unlockedColours);
        return unlockedColours;
    }
}