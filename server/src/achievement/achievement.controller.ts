import {Body, Controller, Delete, Get, Param, Post, Req, UseGuards} from "@nestjs/common";
import { AchievementService } from "./achievement.service";
import { AuthGuard } from "@nestjs/passport";
import { Request } from 'express';

@Controller('achievements')
export class AchievementController {

    constructor(private achievementService: AchievementService){}

}