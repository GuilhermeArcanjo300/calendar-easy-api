import { Enterprise } from "@prisma/client";
import { EnterpriseEntity } from "../entities/enterprise.entity";
import { EnterpriseDto } from "../dtos/enterprise.dto";

export class EnterpriseMapper {
    static mapPrismaToEntity(enterprise: Enterprise): EnterpriseEntity {
        const enterpriseEntity = new EnterpriseEntity();
        enterpriseEntity.id = enterprise.id;
        enterpriseEntity.name = enterprise.name;
        enterpriseEntity.address = enterprise.address;
        enterpriseEntity.phone = enterprise.phone;
        enterpriseEntity.description = enterprise.description ?? undefined;
        return enterpriseEntity;
    }

    static mapEntityToDto(enterprise: EnterpriseEntity): EnterpriseDto {
        const enterpriseDto = new EnterpriseDto();
        enterpriseDto.name = enterprise.name;
        enterpriseDto.address = enterprise.address;
        enterpriseDto.phone = enterprise.phone;
        enterpriseDto.description = enterprise.description ?? '';
        return enterpriseDto;
    }
}