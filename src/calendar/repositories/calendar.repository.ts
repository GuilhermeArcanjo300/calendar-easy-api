import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infra/database/prisma/prisma.service";
import { Repository } from "src/infra/database/repository";
import { CalendarMapper } from "../mappers/calendar.mapper";

@Injectable()
export class CalendarRepository extends Repository {
    constructor(prisma: PrismaService) {
        super(prisma, "calendar");
    }

    async findByDateTime(userId: string, date: Date, timeStart: Date, timeEnd: Date) {
        const result = await this.prisma.calendar.findMany({
            where: {
                client: {
                    enterprise: {
                        userId
                    },
                    deletedAt: null,
                },
                date,
                deletedAt: null,
                AND: [
                    {
                      startTime: {
                        lte: timeEnd,
                      },
                    },
                    {
                      endTime: {
                        gte: timeStart,
                      },
                    },
                ],
            }
        });

        if(!result) {
            return [];
        }

        return result.map(CalendarMapper.mapPrismaToEntity);
    }
}