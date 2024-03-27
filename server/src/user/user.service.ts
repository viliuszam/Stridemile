import {Injectable} from '@nestjs/common';
import { PrismaService } from "src/prisma/prisma.service";
import { User } from '.prisma/client';


@Injectable()
export class UserService {

    constructor(private prisma: PrismaService) {
    }

    async getUserById(id: number): Promise<User | null> {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    id: id
                }
            });
            return user;
        } catch (error) {
            throw new Error('Error fetching user by ID: ' + error.message);
        }
    }

    async changeUsername(userId: number, newUsername: string): Promise<void> {
        const existingUser = await this.prisma.user.findUnique({
          where: { username: newUsername },
        });
    
        if (existingUser) {
          throw new Error('Username is already taken');
        }
    
        await this.prisma.user.update({
          where: { id: userId },
          data: { username: newUsername },
        });
      }
}

export { User };
