import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { ProfileRole } from '@prisma/client';

export class CreateUserDto {
    @IsString()
    @MinLength(2)
    name: string;

    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    @MinLength(6)
    password: string;
} 