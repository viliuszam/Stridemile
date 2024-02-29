import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto, AuthlogDto, AuthForgDto, AuthpassDto } from "./dto";
import { AuthGuard } from "@nestjs/passport";

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

    @UseGuards(AuthGuard('jwt'))
    @Post('passReset')
    passReset(@Body() dto: AuthpassDto,@Req() req){
        return this.authService.passReset(dto, req.user.email);
    }
}