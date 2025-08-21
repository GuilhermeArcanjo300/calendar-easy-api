import { IsOptional, IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateClientDto {
    @IsOptional()
    @IsNotEmpty({ message: 'O nome do cliente não pode ser vazio' })
    name?: string;

    @IsOptional()
    @IsEmail({}, { message: 'E-mail inválido' })
    email?: string;

    @IsOptional()
    phone?: string;

    @IsOptional()
    observation?: string;
}


