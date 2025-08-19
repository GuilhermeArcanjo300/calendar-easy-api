import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infra/database/prisma/prisma.service";
import { Repository } from "src/infra/database/repository";
import { EnterpriseEntity } from "../entities/enterprise.entity";
import { EnterpriseMapper } from "../mappers/enterprise.mapper";
import { CreateUpdateEnterpriseDto } from "../dtos/create-update.dto";

@Injectable()
export class EnterpriseRepository extends Repository {
    constructor(prisma: PrismaService) {
        super(prisma, "enterprise");
    }

    async createOrUpdateByUserId(userId: string, enterpriseData: CreateUpdateEnterpriseDto): Promise<EnterpriseEntity> {
        const enterprise = await this.prisma.enterprise.upsert({
            where: {
                userId,
            },
            update: {
                ...enterpriseData,
            },
            create: {
                ...enterpriseData,
                userId,
            },
        });

        return EnterpriseMapper.mapPrismaToEntity(enterprise);
    }

    async findById(id: string): Promise<EnterpriseEntity | null> {
        const enterprise = await this.prisma.enterprise.findUnique({
            where: {
                id,
            },
        });

        if(!enterprise) {
            return null;
        }

        return EnterpriseMapper.mapPrismaToEntity(enterprise);
    }
} 