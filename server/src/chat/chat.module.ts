import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { PrismaService } from '../prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "../group/strategy";
import { UserService } from 'src/user/user.service';

@Module({
  imports: [JwtModule.register({}), AuthModule],
  controllers: [ChatController],
  providers: [ChatService, PrismaService, JwtStrategy, UserService],
})
export class ChatModule {}
