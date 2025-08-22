import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { CalendarService } from "./calendar.service";
import { UserGuard } from "src/user/guards/user.guard";
import { CreateManualCalendarDto } from "./dtos/create-manual-calendar.dto";
import { UserId } from "src/user/decorators/user-id.decorator";

@Controller('calendar')
export class CalendarController {
    constructor(private readonly calendarService: CalendarService) {}

    @Post('register/manual')
    @UseGuards(UserGuard)
    async createManual(@Body() data: CreateManualCalendarDto, @UserId() userId: string): Promise<void> {
        await this.calendarService.registerManual(userId, data);
    }
}