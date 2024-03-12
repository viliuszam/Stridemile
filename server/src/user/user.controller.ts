import {Body, Controller, Delete, Get, Param, Post, Req, UseGuards} from "@nestjs/common";
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
}
