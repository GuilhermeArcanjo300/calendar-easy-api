import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { EnterpriseService } from './enterprise.service';
import { EnterpriseEntity } from './entities/enterprise.entity';
import { UserGuard } from 'src/user/guards/user.guard';
import { UserId } from 'src/user/decorators/user-id.decorator';
import { CreateUpdateEnterpriseDto } from './dtos/create-update.dto';

@Controller('enterprise')
export class EnterpriseController {
    constructor(private readonly enterpriseService: EnterpriseService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(UserGuard)
    async createOrUpdate(@Body() enterpriseData: CreateUpdateEnterpriseDto, @UserId() userId: string): Promise<EnterpriseEntity> {
        return await this.enterpriseService.createOrUpdate(userId, enterpriseData);
    }
} 