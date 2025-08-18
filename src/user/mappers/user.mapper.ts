import { User } from "@prisma/client";
import { UserEntity } from "../entities/user.entity";
import { UserDto } from "../dtos/user.dto";

export class UserMapper {
    static mapPrismaToEntity(user: User): UserEntity {
        const userEntity = new UserEntity();
        userEntity.id = user.id;
        userEntity.name = user.name;
        userEntity.email = user.email;
        userEntity.phone = user.phone ?? undefined;
        userEntity.profile = user.profile;
        return userEntity;
    }

    static mapEntityToDto(user: UserEntity): UserDto {
        const userDto = new UserDto();
        userDto.name = user.name;
        userDto.email = user.email;
        userDto.phone = user.phone ?? undefined;
        return userDto;
    }
}