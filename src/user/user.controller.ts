import { Controller, Post, Put, Body, HttpCode, HttpStatus, UseGuards, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserGuard } from './guards/user.guard';
import { UserId } from './decorators/user-id.decorator';
import { UserDto } from './dtos/user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @UseGuards(UserGuard)
    async findById(@UserId() userId: string): Promise<UserDto> {
        return await this.userService.getUser(userId);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
        return await this.userService.create(createUserDto);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    @UseGuards(UserGuard)
    async update(
        @UserId() userId: string,
        @Body() updateUserDto: UpdateUserDto,
    ): Promise<UserEntity | null> {
        return await this.userService.update(userId, updateUserDto);
    }
} 