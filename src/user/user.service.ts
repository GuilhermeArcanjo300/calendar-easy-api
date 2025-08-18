import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { UserRepository } from './repositories/user.reposity';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { ProfileRole } from '@prisma/client';
import { UserMapper } from './mappers/user.mapper';
import * as bcrypt from 'bcrypt';
import { UserDto } from './dtos/user.dto';
import { ArgumentNullExpection } from 'src/util/argument-null.util';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async create(createUserDto: CreateUserDto): Promise<UserEntity> {
        const existingUser = await this.userRepository.findByEmail(createUserDto.email);
        if (existingUser) {
            throw new ConflictException('Email já está em uso');
        }

        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

        const createdUser = await this.userRepository.create({
            name: createUserDto.name,
            email: createUserDto.email,
            password: hashedPassword,
        } as UserEntity);
        
        return UserMapper.mapPrismaToEntity(createdUser);
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new NotFoundException('Usuário não encontrado');
        }

        if (updateUserDto.email && updateUserDto.email !== user.email) {
            const userWithEmail = await this.userRepository.findByEmail(updateUserDto.email);
            if (userWithEmail && userWithEmail.id !== id) {
                throw new ConflictException('Email já está em uso por outro usuário');
            }
        }

        const updatedUser = await this.userRepository.update(id, {
            name: updateUserDto.name,
            email: updateUserDto.email,
            phone: updateUserDto.phone,
        } as UserEntity);
        
        return UserMapper.mapPrismaToEntity(updatedUser);
    }

    async getUser(id: string): Promise<UserDto> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new NotFoundException('Usuário não encontrado');
        }
        return UserMapper.mapEntityToDto(user);
    }

    async findById(id: string): Promise<UserEntity | null> {
        const user = await this.userRepository.findById(id);
        ArgumentNullExpection.throwIfNull(user, 'Usuário não encontrado');
        return user;
    }

    async findByEmail(email: string): Promise<UserEntity | null> {
        const user = await this.userRepository.findByEmail(email);
        ArgumentNullExpection.throwIfNull(user, 'Usuário não encontrado');
        return user;
    }
} 