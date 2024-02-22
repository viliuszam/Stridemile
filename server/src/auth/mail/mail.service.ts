import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendForgotPass(user: User, token: string) {
    const url = `http://localhost:3000/resetPassword/${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Reset your Password!',
      template: './forgot',
      context: {
        name: user.username,
        url,
      },
    });
  }
}