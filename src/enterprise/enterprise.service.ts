import { Injectable } from '@nestjs/common';
import { EnterpriseRepository } from './repositories/enterprise.repository';
import { EnterpriseEntity } from './entities/enterprise.entity';
import { CreateUpdateEnterpriseDto } from './dtos/create-update.dto';

@Injectable()
export class EnterpriseService {
    constructor(private readonly enterpriseRepository: EnterpriseRepository) {}

    async createOrUpdate(userId: string, enterpriseData: CreateUpdateEnterpriseDto): Promise<EnterpriseEntity> {
        return await this.enterpriseRepository.createOrUpdateByUserId(userId, enterpriseData);
    }
} 