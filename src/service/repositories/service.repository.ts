import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infra/database/prisma/prisma.service";
import { Repository } from "src/infra/database/repository";
import { ServiceEntity } from "../entities/service.entity";
import { ServiceMapper } from "../mappers/service.mapper";

@Injectable()
export class ServiceRepository extends Repository {
    constructor(prisma: PrismaService) {
        super(prisma, "service");
    }

    async delete(id: string): Promise<void> {
        await this.prisma.service.update({
            where: { id },
            data: {
                deletedAt: new Date(),
            },
        });
    }

    async listAllByUserId(userId: string): Promise<ServiceEntity[]> {
        const services = await this.prisma.service.findMany({
            where: { 
                enterprise: {
                    userId,
                },
                deletedAt: null,
             },
            orderBy: { createdAt: "desc" },
        });

        if(!services) {
            return [];
        }

        return services.map(ServiceMapper.mapPrismaToEntity);
    }

    async findById(id: string): Promise<ServiceEntity | null> {
        const service = await this.prisma.service.findUnique({ where: { id } });
        if(!service) {
            return null;
        }
        return ServiceMapper.mapPrismaToEntity(service);
    }
}


