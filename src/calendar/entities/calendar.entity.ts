import { StatusCalendar } from "@prisma/client";

export class CalendarEntity {
    id: string;
    clientId: string;
    serviceId: string;
    date: Date;
    startTime: Date;
    endTime: Date;
    status: StatusCalendar;
}