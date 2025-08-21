import { Injectable, NotFoundException } from '@nestjs/common';
import { EnterpriseRepository } from './repositories/enterprise.repository';
import { EnterpriseEntity } from './entities/enterprise.entity';
import { CreateUpdateEnterpriseDto } from './dtos/create-update.dto';
import { ArgumentNullExpection } from 'src/util/argument-null.util';

@Injectable()
export class EnterpriseService {
    constructor(private readonly enterpriseRepository: EnterpriseRepository) {}

    async createOrUpdate(userId: string, enterpriseData: CreateUpdateEnterpriseDto): Promise<EnterpriseEntity> {
        return await this.enterpriseRepository.createOrUpdateByUserId(userId, enterpriseData);
    }

    async getEnterpriseIdByUser(userId: string): Promise<EnterpriseEntity> {
        const enterprise = await this.enterpriseRepository.findByUserId(userId);
        if(!enterprise) {
            throw new NotFoundException('Empresa não encontrada');
        }
        return enterprise;
    }
} 