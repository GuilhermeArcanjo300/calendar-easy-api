import { Service } from "@prisma/client";
import { ServiceDto } from "../dtos/service.dto";
import { ServiceEntity } from "../entities/service.entity";

export class ServiceMapper {
    static mapPrismaToEntity(service: Service): ServiceEntity {
        const serviceEntity = new ServiceEntity();
        serviceEntity.id = service.id;
        serviceEntity.name = service.name;
        serviceEntity.description = service.description;
        serviceEntity.minute = service.minute;
        serviceEntity.value = service.value.toNumber();
        serviceEntity.active = service.active;
        serviceEntity.enterpriseId = service.enterpriseId;
        return serviceEntity;
    }

    static mapEntityToDto(service: ServiceEntity): ServiceDto {
        const serviceDto = new ServiceDto();
        serviceDto.id = service.id;
        serviceDto.name = service.name;
        serviceDto.active = service.active;
        serviceDto.description = service.description;
        serviceDto.duration = service.minute;
        serviceDto.value = service.value;
        return serviceDto;
    }
}


