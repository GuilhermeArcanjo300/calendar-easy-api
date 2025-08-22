import { Transform } from "class-transformer";
import { stringToDate } from "src/util/transform/string-to-date";

export class CreateManualCalendarDto {
    clientId: string;
    serviceId: string;

    @Transform(stringToDate)
    date: Date;
    time: string;
    observation: string;
}