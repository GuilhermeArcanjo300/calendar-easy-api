import { BadRequestException, Injectable } from "@nestjs/common";
import { CalendarRepository } from "./repositories/calendar.repository";
import { CreateManualCalendarDto } from "./dtos/create-manual-calendar.dto";
import { ClientService } from "src/client/client.service";
import { ServiceService } from "src/service/service.service";
import { CalendarEntity } from "./entities/calendar.entity";
import { StatusCalendar } from "@prisma/client";
import * as moment from "moment";

@Injectable()
export class CalendarService {
    constructor(
        private readonly calendarRepository: CalendarRepository,
        private readonly clientService: ClientService,
        private readonly serviceService: ServiceService,
    ) {}

    async registerManual(userId: string, data: CreateManualCalendarDto): Promise<void> {
        const [client, service] = await Promise.all([
            this.clientService.findByIdAndUserId(data.clientId, userId),
            this.serviceService.findByIdAndUserId(data.serviceId, userId)
        ]);

        const timeStart = moment.utc(data.time, 'HH:mm').toDate();
        const timeEnd = moment.utc(timeStart).add(service.minute, 'minute').toDate();

        const calendarExistent = await this.calendarRepository.findByDateTime(userId, data.date, timeStart, timeEnd);
        const hasCalendarConfirmed = calendarExistent.some(c => c.status == StatusCalendar.CONFIRMED || c.status == StatusCalendar.COMPLETED);
        if(hasCalendarConfirmed) {
            throw new BadRequestException('Data e horário não disponivel, selecione outra data/hora');
        }

        await this.calendarRepository.create({
            clientId: client.id,
            serviceId: service.id,
            date: data.date,
            status: StatusCalendar.CONFIRMED,
            startTime: timeStart,
            endTime: timeEnd,
        } as CalendarEntity);
    }
}