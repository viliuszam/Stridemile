import {Body, Controller, Delete, Get, Param, Post} from "@nestjs/common";
import { UserService } from "./user.service";

@Controller('users')
export class UserController {

    constructor(private userService: UserService){}
}
