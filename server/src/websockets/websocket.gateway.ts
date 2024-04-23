import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service'; 

// TODO: pagreitinimui storint issaugot grupes, kad nereiktu daryt daug prisma queries
@WebSocketGateway()
export class WebsocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    @Inject(JwtService) private jwtService: JwtService,
    @Inject(ConfigService) private configService: ConfigService,
    private prisma: PrismaService,
  ) {}

  async handleConnection(client: Socket) {
    console.log('WebSocket connection established');

    const token = client.handshake.headers.authorization?.split(' ')[1];

    if (!token) {
      return;
    }

    console.log('token:', token);

    const secret = this.configService.get('JWT_SECRET');
    const userVerified = this.jwtService.verify(token, { secret });
    if(userVerified){
        const user = await this.prisma.user.findUnique({
          where: {id: userVerified.sub}
        })

        // pridet user objekta prie connection
        client.data.user = user;
        const userId = user.id;

        console.log('Connected user:', user);

        // prijoinint prie user grupiu
        client.join(`user-${userId}`);
        console.log(`join user-${userId}`);

        this.prisma.groupMember
          .findMany({
            where: { userId },
            select: { group: true },
          })
          .then((userGroups) => {
            userGroups.forEach((groupMember) => {
              const groupId = groupMember.group.id;
              client.join(`group-${groupId}`);
              console.log(`join group-${groupId}`);
            });
          });
    }
  }

  handleDisconnect(client: Socket) {
    console.log('WebSocket connection disconnected');

    const user = client.data.user;
    const userId = user?.id;

    if (userId) {
      client.leave(`user-${userId}`);
      console.log(`leave user-${userId}`);

      this.prisma.groupMember
        .findMany({
          where: { userId },
          select: { group: true },
        })
        .then((userGroups) => {
          userGroups.forEach((groupMember) => {
            const groupId = groupMember.group.id;
            client.leave(`group-${groupId}`);
            console.log(`leave group-${groupId}`);
          });
        });

        const lastLocation = client.data.lastLocation;
        if (lastLocation) {
          this.prisma.lastLocation.upsert({
            where: { userId: userId },
            update: {
              longitude: lastLocation.longitude,
              latitude: lastLocation.latitude,
              lastSeenAt: new Date()
            },
            create: {
              userId: userId,
              longitude: lastLocation.longitude,
              latitude: lastLocation.latitude,
              lastSeenAt: new Date()
            }
          }).then(() => {
            console.log('created/updated user last seen.');
          }).catch((error) => {
            console.error('error saving last seen', error);
          });
        }

    }
  }

  @SubscribeMessage('userLocation')
  handleUserLocation(client: Socket, payload: any) {
    const user = client.data.user;
    const userId = user?.id;

    if (!userId) {
      return;
    }

    const { location } = payload;

    client.data.lastLocation = location;

    this.prisma.groupMember
      .findMany({
        where: { userId },
        select: { group: true },
      })
      .then((userGroups) => {
        userGroups.forEach((groupMember) => {
          const groupId = groupMember.group.id;
          client.to(`group-${groupId}`).emit('userLocation', { userId, location });
          console.log(`userLocation to group-${groupId} from ${userId}, location: ${location.latitude},
           ${location.longitude}`);
        });
      });
  }
}