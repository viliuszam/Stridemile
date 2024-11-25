import { ForbiddenException, NotFoundException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto, AuthlogDto, AuthForgDto, AuthpassDto } from "./dto";
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { MailService } from './mail/mail.service';
import { Multer } from 'multer';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService, private mailService: MailService,) {

  }


  async signin(dto: AuthlogDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        username: dto.username
      }
    })

    if (!user) {
      throw new ForbiddenException('Incorrect credentials')
    }

    const pwMatches = await argon.verify(user.hash, dto.password)

    if (!pwMatches) {
      throw new ForbiddenException('Incorrect credentials')
    }
    return this.signToken(user.id, user.email)
  }

  async signup(dto: AuthDto, profileURL: string) {

    if (dto.password.length < 5) {
      throw new ForbiddenException('Password must be atlest 5 characters long');
    }

    if (!dto.email.match(/^\S+@\S+\.\S+$/)) {
      throw new ForbiddenException("Invalid email provided");
    }

    const hash = await argon.hash(dto.password);
    try {
      const user = await this.prisma.user.create({
        data: {
          username: dto.name,
          email: dto.email,
          hash,
          profile_picture: profileURL
        },
      });

      return this.signToken(user.id, user.email)
    }
    catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
        if (error.message.includes('email')) {
          throw new ForbiddenException('Email is already taken');
        } else if (error.message.includes('username')) {
          throw new ForbiddenException('Username is already taken');
        }
      }
      throw error;
    }

  }

  async signToken(userId: number, email: string): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email
    }
    const secret = this.config.get('JWT_SECRET')

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '60m',
      secret: secret
    })

    return {
      access_token: token,
    }
  }

  async sendForgot(dto: AuthForgDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });
      if (user) {
        const token = await this.resetToken(user.id, user.email);
        await this.prisma.user.update({
          where: { id: user.id },
          data: {
            resetPassToken: token,
            isResetValid: true
          },
        });
        await this.mailService.sendForgotPass(user, await token);
        return true;
      } else {
        throw new ForbiddenException('Email does not exist');
      }

    } catch (e) {
      throw e;
    }
  }

  async passReset(dto: AuthpassDto, email) {
    const hash = await argon.hash(dto.newPassword);

    const user = await this.prisma.user.findFirst({
      where: {
        email: email
      }
    })

    if (!user.isResetValid) {
      throw new ForbiddenException('Password could not be updated')
    }

    await this.prisma.user.update({
      where: {
        email: email,
      },
      data: {
        hash: hash,
        resetPassToken: "",
        isResetValid: false
      },
    });
  }

  async passChange(oldPassword: string, newPassword: string, email: string) {

    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isOldPasswordValid = await argon.verify(user.hash, oldPassword);

    if (!isOldPasswordValid) {
      throw new ForbiddenException('Old password is incorrect');
    }

    const newHash = await argon.hash(newPassword);

    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        hash: newHash,
        resetPassToken: '',
        isResetValid: false,
      },
    });
  }

  async resetToken(userId: number, email: string) {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '30m',
      secret: secret,
    });

    return token;
  }
}