import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { ClientRepository } from './repositories/client.repository';
import { CreateClientDto } from './dtos/create-client.dto';
import { UpdateClientDto } from './dtos/update-client.dto';
import { ClientEntity } from './entities/client.entity';
import { ClientDto } from './dtos/client.dto';
import { ClientMapper } from './mappers/client.mapper';
import { ArgumentNullExpection } from 'src/util/argument-null.util';
import { EnterpriseService } from 'src/enterprise/enterprise.service';

@Injectable()
export class ClientService {
    constructor(
        private readonly clientRepository: ClientRepository,
        private readonly enterpriseService: EnterpriseService,
    ) {}

    async create(userId: string, data: CreateClientDto): Promise<void> {
        const enterprise = await this.enterpriseService.getEnterpriseIdByUser(userId);

        if(data.phone) {
            const { phone } = data;
            const clientExistent = await this.clientRepository.findByPhone(phone);
            if(clientExistent != null) {
                throw new BadRequestException(`Já existente um cliente com o telefone ${phone}`);
            }
        }

        await this.clientRepository.create({
            name: data.name,
            email: data.email,
            phone: data.phone,
            enterpriseId: enterprise.id,
            observation: data.observation,
        } as ClientEntity);
    }

    async updateStatus(userId: string, id: string, active: boolean): Promise<void> {
        const enterprise = await this.enterpriseService.getEnterpriseIdByUser(userId);
        const existing = await this.clientRepository.findById(id);

        if (!existing) {
            throw new NotFoundException('Cliente não encontrado');
        }
        
        if (existing.enterpriseId !== enterprise.id) {
            throw new ForbiddenException('Acesso negado ao cliente informado');
        }

        await this.clientRepository.update(id, {
            active
        } as ClientEntity);
    }

    async update(userId: string, id: string, data: UpdateClientDto): Promise<void> {
        const enterprise = await this.enterpriseService.getEnterpriseIdByUser(userId);
        const existing = await this.clientRepository.findById(id);

        if (!existing) {
            throw new NotFoundException('Cliente não encontrado');
        }
        
        if (existing.enterpriseId !== enterprise.id) {
            throw new ForbiddenException('Acesso negado ao cliente informado');
        }

        if(data.phone) {
            const { phone } = data;
            const clientExistent = await this.clientRepository.findByPhone(phone);
            if(clientExistent != null) {
                throw new BadRequestException(`Já existente um cliente com o telefone ${phone}`);
            }
        }

        await this.clientRepository.update(id, {
            name: data.name,
            email: data.email,
            phone: data.phone,
            observation: data.observation,
        } as ClientEntity);
    }

    async delete(userId: string, id: string): Promise<void> {
        const existing = await this.clientRepository.findById(id);
        ArgumentNullExpection.throwIfNull(existing, 'Cliente não encontrado');

        const enterprise = await this.enterpriseService.getEnterpriseIdByUser(userId);
        if (existing?.enterpriseId && existing.enterpriseId !== enterprise?.id) {
            throw new ForbiddenException('Acesso negado ao cliente informado');
        }
        await this.clientRepository.delete(id);
    }

    async listAll(userId: string): Promise<ClientDto[]> {
        const clients = await this.clientRepository.listAllByUserId(userId);
        return clients.map(ClientMapper.mapEntityToDto);
    }
}


