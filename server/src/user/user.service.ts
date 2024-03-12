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
}

export { User };
