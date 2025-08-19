import { EnterpriseDto } from "src/enterprise/dtos/enterprise.dto";

export class UserDto {
    name: string;
    email: string;
    phone?: string;
    enterprise: EnterpriseDto;
}