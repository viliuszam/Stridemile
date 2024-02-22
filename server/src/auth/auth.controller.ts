import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto, AuthlogDto, AuthForgDto } from "./dto";

@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService){}

    @Post('signup')
    signup(@Body() dto: AuthDto){
        console.log(dto)
        return this.authService.signup(dto)
    }

    @Post('signin')
    signin(@Body() dto: AuthlogDto){
        console.log(dto)
        return this.authService.signin(dto)
    }

    @Post('forgotPass')
    forgot(@Body() dto: AuthForgDto) {
        console.log(dto);
        return this.authService.sendForgot(dto);
    }
}