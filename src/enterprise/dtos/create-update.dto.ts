import { IsNotEmpty } from "class-validator";

export class CreateUpdateEnterpriseDto {
    @IsNotEmpty({ message: 'O nome da empresa é obrigatório' })
    name: string;

    @IsNotEmpty({ message: 'O endereço da empresa é obrigatório' })
    address: string;

    @IsNotEmpty({ message: 'O telefone da empresa é obrigatório' })
    phone: string;

    description: string;
}