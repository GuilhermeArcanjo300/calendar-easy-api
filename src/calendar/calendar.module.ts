import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/infra/database/database.module";
import { CalendarService } from "./calendar.service";
import { CalendarController } from "./calendar.controller";
import { ClientModule } from "src/client/client.module";
import { ServiceModule } from "src/service/service.module";

@Module({
    imports: [DatabaseModule, ClientModule, ServiceModule],
    controllers: [CalendarController],
    providers: [CalendarService],
    exports: [CalendarService],
})
export class CalendarModule {}