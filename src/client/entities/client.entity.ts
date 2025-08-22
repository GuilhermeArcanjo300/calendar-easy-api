import { CalendarEntity } from "src/calendar/entities/calendar.entity";

export class ClientEntity {
    id: string;
    name: string;
    email?: string;
    phone?: string;
    active: boolean;
    enterpriseId: string;
    observation?: string;

    calendar: CalendarEntity[];

    getVisitCounter(): number {
        if(!this.calendar) {
            return 0;
        }
        return this.calendar.length;
    }
}


