import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { PrismaService } from '../prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';
import { MailModule } from "./mail/mail.module";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategy";
import { UserService } from 'src/user/user.service';

@Module({
  imports: [JwtModule.register({}), AuthModule, MailModule],
  controllers: [GroupController],
  providers: [GroupService, PrismaService, JwtStrategy, UserService],
})
export class GroupModule {}
