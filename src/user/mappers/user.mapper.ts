import { User } from "@prisma/client";
import { UserEntity } from "../entities/user.entity";

export class UserMapper {
    static mapPrismaToEntity(user: User): UserEntity {
        const userEntity = new UserEntity();
        userEntity.id = user.id;
        userEntity.name = user.name;
        userEntity.email = user.email;
        userEntity.password = user.password;
        userEntity.createdAt = user.createdAt;
        userEntity.updatedAt = user.updatedAt;
        userEntity.deletedAt = user.deletedAt;
        return userEntity;
    }
}