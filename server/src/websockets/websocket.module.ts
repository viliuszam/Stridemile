import { Module } from '@nestjs/common';
import { WebsocketGateway } from './websocket.gateway';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [WebsocketGateway, JwtService, ConfigService, PrismaService],
})
export class WebsocketModule {}