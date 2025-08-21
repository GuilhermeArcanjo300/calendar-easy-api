import { Client } from "@prisma/client";
import { ClientEntity } from "../entities/client.entity";
import { ClientDto } from "../dtos/client.dto";

export class ClientMapper {
    static mapPrismaToEntity(client: Client): ClientEntity {
        const clientEntity = new ClientEntity();
        clientEntity.id = client.id;
        clientEntity.name = client.name;
        clientEntity.email = client.email ?? undefined;
        clientEntity.phone = client.phone ?? undefined;
        clientEntity.enterpriseId = client.enterpriseId;
        clientEntity.active = client.active;
        clientEntity.observation = client.observation ?? undefined;
        return clientEntity;
    }

    static mapEntityToDto(client: ClientEntity): ClientDto {
        const clientDto = new ClientDto();
        clientDto.id = client.id;
        clientDto.name = client.name;
        clientDto.email = client.email;
        clientDto.phone = client.phone;
        clientDto.active = client.active;
        clientDto.observation = client.observation;
        return clientDto;
    }
}


