import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendGroupInvitation(user: User, groupName: string, token: string) {
    const url = `http://localhost:3000/groups/${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'You are invited to join a group!',
      template: './groupInvitation',
      context: {
        name: user.username,
        groupName,
        url,
      },
    });
  }
}
