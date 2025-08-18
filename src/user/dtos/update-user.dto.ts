import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { ProfileRole } from '@prisma/client';

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    @MinLength(2)
    name?: string;

    @IsOptional()
    @IsEmail({},{message: 'O email deve ser válido'})
    email?: string;

    @IsOptional()
    @IsString()
    phone?: string;
} 