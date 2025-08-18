import { PrismaService } from "./prisma/prisma.service";

export class Repository {
    constructor(
        protected readonly prisma: PrismaService,
        protected readonly model: string,
    ) {}

    async create(data: any): Promise<any> {
        return await this.prisma[this.model].create({ 
            data,
        });
    }

    async update(id: string, data: any): Promise<any> {
        return await this.prisma[this.model].update({
            where: { id },
            data,
        });
    }
}