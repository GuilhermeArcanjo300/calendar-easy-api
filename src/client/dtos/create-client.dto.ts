import { IsNotEmpty, IsOptional, IsEmail } from 'class-validator';

export class CreateClientDto {
    @IsNotEmpty({ message: 'O nome do cliente é obrigatório' })
    name: string;

    @IsOptional()
    @IsEmail({}, { message: 'E-mail inválido' })
    email?: string;

    @IsOptional()
    phone?: string;

    @IsOptional()
    observation?: string;
}


