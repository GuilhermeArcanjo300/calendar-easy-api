import { Calendar, Client } from "@prisma/client";
import { ClientEntity } from "../entities/client.entity";
import { ClientDto } from "../dtos/client.dto";
import { CalendarMapper } from "src/calendar/mappers/calendar.mapper";

export class ClientMapper {
    static mapPrismaToEntity(client: Client & { calendar?: Calendar[] }): ClientEntity {
        const { calendar } = client;
        const clientEntity = new ClientEntity();
        clientEntity.id = client.id;
        clientEntity.name = client.name;
        clientEntity.email = client.email ?? undefined;
        clientEntity.phone = client.phone ?? undefined;
        clientEntity.enterpriseId = client.enterpriseId;
        clientEntity.active = client.active;
        clientEntity.observation = client.observation ?? undefined;

        if(calendar) {
            clientEntity.calendar = calendar.map(CalendarMapper.mapPrismaToEntity);
        }

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
        clientDto.visitCounter = client.getVisitCounter();
        return clientDto;
    }
}


