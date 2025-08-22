import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infra/database/prisma/prisma.service";
import { Repository } from "src/infra/database/repository";
import { ClientEntity } from "../entities/client.entity";
import { ClientMapper } from "../mappers/client.mapper";
import { CreateClientDto } from "../dtos/create-client.dto";
import { UpdateClientDto } from "../dtos/update-client.dto";
import { StatusCalendar } from "@prisma/client";

@Injectable()
export class ClientRepository extends Repository {
    constructor(prisma: PrismaService) {
        super(prisma, "client");
    }

    async createForEnterprise(enterpriseId: string, data: CreateClientDto): Promise<ClientEntity> {
        const client = await this.prisma.client.create({
            data: {
                ...data,
                enterpriseId,
            },
        });
        return ClientMapper.mapPrismaToEntity(client);
    }

    async updateForEnterprise(enterpriseId: string, id: string, data: UpdateClientDto): Promise<ClientEntity> {
        const client = await this.prisma.client.update({
            where: { id },
            data: {
                ...data,
                enterpriseId,
            },
        });
        return ClientMapper.mapPrismaToEntity(client);
    }

    async delete(id: string): Promise<void> {
        await this.prisma.client.update({
            where: { id },
            data: {
                deletedAt: new Date(),
            },
        });
    }

    async listAllByUserId(userId: string): Promise<ClientEntity[]> {
        const clients = await this.prisma.client.findMany({
            where: { 
                enterprise: {
                    userId,
                },
                deletedAt: null,
            },
            include: {
                calendar: {
                    where: {
                        status: {
                            in: [StatusCalendar.CONFIRMED, StatusCalendar.COMPLETED]
                        },
                        deletedAt: null,
                    }
                }
            },
            orderBy: { createdAt: "desc" },
        });

        if(!clients) {
            return [];
        }

        return clients.map(ClientMapper.mapPrismaToEntity);
    }

    async findById(id: string): Promise<ClientEntity | null> {
        const client = await this.prisma.client.findUnique({ where: { id } });
        if(!client) {
            return null;
        }
        return ClientMapper.mapPrismaToEntity(client);
    }

    async findByPhone(phone: string): Promise<ClientEntity | null> {
        const client = await this.prisma.client.findFirst({
            where: {
                phone,
                deletedAt: null,
            },
        });

        if(!client) {
            return null;
        }

        return ClientMapper.mapPrismaToEntity(client);
    }
}


