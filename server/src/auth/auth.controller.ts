import { Body, Controller, Post, Req, UseGuards, HttpException, HttpStatus, UseInterceptors, UploadedFile, UploadedFiles} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto, AuthlogDto, AuthForgDto, AuthpassDto } from "./dto";
import { AuthGuard } from "@nestjs/passport";
import { AnyFilesInterceptor } from "@nestjs/platform-express";
import path = require('path');
import { diskStorage, Multer } from 'multer';
import { v4 as uuidv4 } from 'uuid';

@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService){}

    @Post('signup')
    @UseInterceptors(AnyFilesInterceptor({
      storage: diskStorage({
        destination: (req, file, cb) => {
          var destination = "./uploads/userimages"
          cb(null, destination);
        },
        filename: (req, file, cb) => {
          const filename: string =
            path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
          const extension: string = path.parse(file.originalname).ext;
          cb(null, `${filename}${extension}`);
        },
      }),
    }))
    signup(@Body() dto: AuthDto, @UploadedFiles() files: Array<Multer.File>){
        var profileFN = null;
        for(let i = 0; i < files.length; i++){
          profileFN = process.env.USER_PHOTO_PATH + files[i].filename;
        }
        return this.authService.signup(dto, profileFN)
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