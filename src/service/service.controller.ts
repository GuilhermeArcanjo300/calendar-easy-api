import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ServiceService } from './service.service';
import { UserGuard } from 'src/user/guards/user.guard';
import { UserId } from 'src/user/decorators/user-id.decorator';
import { ServiceDto } from './dtos/service.dto';
import { CreateServiceDto } from './dtos/create-service.dto';
import { UpdateServiceDto } from './dtos/update-service.dto';

@Controller('services')
export class ServiceController {
    constructor(private readonly serviceService: ServiceService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(UserGuard)
    async create(@Body() data: CreateServiceDto, @UserId() userId: string): Promise<void> {
        await this.serviceService.create(userId, data);
    }

    @Put(':id')
    @UseGuards(UserGuard)
    async update(
        @Param('id') id: string,
        @Body() data: UpdateServiceDto,
        @UserId() userId: string,
    ): Promise<void> {
        await this.serviceService.update(userId, id, data);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @UseGuards(UserGuard)
    async delete(@Param('id') id: string, @UserId() userId: string): Promise<void> {
        return await this.serviceService.delete(userId, id);
    }

    @Get('list')
    @UseGuards(UserGuard)
    async listAll(@UserId() userId: string): Promise<ServiceDto[]> {
        return await this.serviceService.listAll(userId);
    }
}


