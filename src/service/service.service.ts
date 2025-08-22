import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { ServiceRepository } from './repositories/service.repository';
import { ServiceEntity } from './entities/service.entity';
import { ServiceDto } from './dtos/service.dto';
import { ServiceMapper } from './mappers/service.mapper';
import { ArgumentNullExpection } from 'src/util/argument-null.util';
import { EnterpriseService } from 'src/enterprise/enterprise.service';
import { CreateServiceDto } from './dtos/create-service.dto';
import { UpdateServiceDto } from './dtos/update-service.dto';

@Injectable()
export class ServiceService {
    constructor(
        private readonly serviceRepository: ServiceRepository,
        private readonly enterpriseService: EnterpriseService,
    ) {}

    async findByIdAndUserId(id: string, userId: string): Promise<ServiceEntity> {
        const service = await this.serviceRepository.findById(id);
        if(!service) {
            throw new NotFoundException('Serviço não encontrado!');
        }

        const enterprise = await this.enterpriseService.getEnterpriseIdByUser(userId);
        if (service.enterpriseId !== enterprise.id) {
            throw new NotFoundException('Serviço não encontrado!');
        }

        return service;
    }

    async create(userId: string, data: CreateServiceDto): Promise<void> {
        const enterprise = await this.enterpriseService.getEnterpriseIdByUser(userId);

        await this.serviceRepository.create({
            name: data.name,
            description: data.description,
            minute: data.duration,
            value: data.value,
            enterpriseId: enterprise.id,
        } as ServiceEntity);
    }

    async updateStatus(userId: string, id: string, active: boolean): Promise<void> {
        const enterprise = await this.enterpriseService.getEnterpriseIdByUser(userId);
        const existing = await this.serviceRepository.findById(id);

        if (!existing) {
            throw new NotFoundException('Serviço não encontrado');
        }
        
        if (existing.enterpriseId !== enterprise.id) {
            throw new ForbiddenException('Acesso negado ao serviço informado');
        }

        await this.serviceRepository.update(id, {
            active,
        } as ServiceEntity);
    }

    async update(userId: string, id: string, data: UpdateServiceDto): Promise<void> {
        const enterprise = await this.enterpriseService.getEnterpriseIdByUser(userId);
        const existing = await this.serviceRepository.findById(id);

        if (!existing) {
            throw new NotFoundException('Serviço não encontrado');
        }
        
        if (existing.enterpriseId !== enterprise.id) {
            throw new ForbiddenException('Acesso negado ao serviço informado');
        }

        await this.serviceRepository.update(id, {
            name: data.name,
            description: data.description,
            minute: data.duration,
            value: data.value,
        } as ServiceEntity);
    }

    async delete(userId: string, id: string): Promise<void> {
        const existing = await this.serviceRepository.findById(id);
        ArgumentNullExpection.throwIfNull(existing, 'Serviço não encontrado');

        const enterprise = await this.enterpriseService.getEnterpriseIdByUser(userId);
        if (existing?.enterpriseId && existing.enterpriseId !== enterprise?.id) {
            throw new ForbiddenException('Acesso negado ao serviço informado');
        }
        await this.serviceRepository.delete(id);
    }

    async listAll(userId: string): Promise<ServiceDto[]> {
        const services = await this.serviceRepository.listAllByUserId(userId);
        return services.map(ServiceMapper.mapEntityToDto);
    }
}


