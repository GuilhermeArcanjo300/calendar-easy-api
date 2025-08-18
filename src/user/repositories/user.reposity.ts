import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infra/database/prisma/prisma.service";
import { Repository } from "src/infra/database/repository";
import { UserMapper } from "../mappers/user.mapper";
import { UserEntity } from "../entities/user.entity";

@Injectable()
export class UserRepository extends Repository {
    constructor(prisma: PrismaService) {
        super(prisma, "user");
    }

    async findByEmail(email: string): Promise<UserEntity | null> {
        const user = await this.prisma.user.findUnique({
            where: {
                email,
            },
        });

        if(!user) {
            return null;
        }

        return UserMapper.mapPrismaToEntity(user);
    }
}