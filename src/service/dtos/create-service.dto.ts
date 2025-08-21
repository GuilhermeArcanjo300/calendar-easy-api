import { IsNotEmpty } from 'class-validator';

export class CreateServiceDto {
    @IsNotEmpty({ message: 'O nome do serviço é obrigatório' })
    name: string;

    @IsNotEmpty({ message: 'A descrição do serviço é obrigatório' })
    description: string;

    @IsNotEmpty({ message: 'A duração do serviço é obrigatório' })
    duration: number;

    @IsNotEmpty({ message: 'O valor do serviço é obrigatório' })
    value: number;
}


