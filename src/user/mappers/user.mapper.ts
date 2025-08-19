import { Enterprise, User } from "@prisma/client";
import { UserEntity } from "../entities/user.entity";
import { UserDto } from "../dtos/user.dto";
import { EnterpriseMapper } from "src/enterprise/mappers/enterprise.mapper";

export class UserMapper {
    static mapPrismaToEntity(user: User & { enterprise?: Enterprise | null }): UserEntity {
        const userEntity = new UserEntity();
        userEntity.id = user.id;
        userEntity.name = user.name;
        userEntity.email = user.email;
        userEntity.phone = user.phone ?? undefined;
        userEntity.profile = user.profile;

        if (user.enterprise) {
            userEntity.enterprise = EnterpriseMapper.mapPrismaToEntity(user.enterprise);
        }

        return userEntity;
    }

    static mapEntityToDto(user: UserEntity): UserDto {
        const userDto = new UserDto();
        userDto.name = user.name;
        userDto.email = user.email;
        userDto.phone = user.phone ?? undefined;

        if (user.enterprise) {
            userDto.enterprise = EnterpriseMapper.mapEntityToDto(user.enterprise);
        }

        return userDto;
    }
}