import { Calendar } from "@prisma/client";
import { CalendarEntity } from "../entities/calendar.entity";

export class CalendarMapper {
    static mapPrismaToEntity(calendar: Calendar): CalendarEntity {
        const calendarEntity = new CalendarEntity();
        calendarEntity.id = calendar.id;
        calendarEntity.clientId = calendar.clientId;
        calendarEntity.serviceId = calendar.serviceId;
        calendarEntity.date = calendar.date;
        calendarEntity.startTime = calendar.startTime;
        calendarEntity.endTime = calendar.endTime;
        calendarEntity.status = calendar.status;
        return calendarEntity;
    }
}