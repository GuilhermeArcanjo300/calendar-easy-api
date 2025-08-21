import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dtos/create-client.dto';
import { UpdateClientDto } from './dtos/update-client.dto';
import { UserGuard } from 'src/user/guards/user.guard';
import { UserId } from 'src/user/decorators/user-id.decorator';
import { ClientEntity } from './entities/client.entity';
import { ClientDto } from './dtos/client.dto';

@Controller('clients')
export class ClientController {
    constructor(private readonly clientService: ClientService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(UserGuard)
    async create(@Body() data: CreateClientDto, @UserId() userId: string): Promise<void> {
        await this.clientService.create(userId, data);
    }

    @Patch(':id/active')
    @UseGuards(UserGuard)
    async activeClient(
        @Param('id') id: string,
        @UserId() userId: string,
    ): Promise<void> {
        await this.clientService.updateStatus(userId, id, true);
    }

    @Patch(':id/disable')
    @UseGuards(UserGuard)
    async disableClient(
        @Param('id') id: string,
        @UserId() userId: string,
    ): Promise<void> {
        await this.clientService.updateStatus(userId, id, false);
    }

    @Put(':id')
    @UseGuards(UserGuard)
    async update(
        @Param('id') id: string,
        @Body() data: UpdateClientDto,
        @UserId() userId: string,
    ): Promise<void> {
        await this.clientService.update(userId, id, data);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @UseGuards(UserGuard)
    async delete(@Param('id') id: string, @UserId() userId: string): Promise<void> {
        return await this.clientService.delete(userId, id);
    }

    @Get('list')
    @UseGuards(UserGuard)
    async listAll(@UserId() userId: string): Promise<ClientDto[]> {
        return await this.clientService.listAll(userId);
    }
}


