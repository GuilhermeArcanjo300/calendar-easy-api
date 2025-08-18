import { Module } from "@nestjs/common";
import { UserRepository } from "src/user/repositories/user.reposity";
import { PrismaService } from "./prisma/prisma.service";

@Module({
  providers: [
    PrismaService,
    {
    provide: UserRepository,
    useFactory: (prismaService: PrismaService) => {
      return new UserRepository(prismaService);
    },
    inject: [PrismaService],
  }],
  exports: [UserRepository],
})
export class DatabaseModule {}