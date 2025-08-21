import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateServiceDto {
    @IsOptional()
    @IsNotEmpty({ message: 'O nome do serviço é obrigatório' })
    name: string;

    @IsOptional()
    @IsNotEmpty({ message: 'A descrição do serviço é obrigatório' })
    description: string;

    @IsOptional()
    @IsNotEmpty({ message: 'A duração do serviço é obrigatório' })
    duration: number;

    @IsOptional()
    @IsNotEmpty({ message: 'O valor do serviço é obrigatório' })
    value: number;
}


