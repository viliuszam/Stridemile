import { Body, Controller, Post, Req, UseGuards, HttpException, HttpStatus } from "@nestjs/common";
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

    @UseGuards(AuthGuard('jwt'))
    @Post('passChange')
    async passChange(@Body() body: { oldPassword: string, newPassword: string }, @Req() req) {
      try {
        const email = req.user.email;
        await this.authService.passChange(body.oldPassword, body.newPassword, email);
  
        return { message: 'Password change successful' };
      } catch (error) {
        if (error instanceof HttpException) {
          throw error;
        } else {
          throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }
    }
}