import { Module } from "@nestjs/common";
import { UserRepository } from "src/user/repositories/user.reposity";
import { PrismaService } from "./prisma/prisma.service";
import { EnterpriseRepository } from "src/enterprise/repositories/enterprise.repository";
import { ClientRepository } from "src/client/repositories/client.repository";

@Module({
  providers: [
    PrismaService,
    {
    provide: UserRepository,
    useFactory: (prismaService: PrismaService) => {
      return new UserRepository(prismaService);
    },
    inject: [PrismaService],
  },
  {
    provide: EnterpriseRepository,
    useFactory: (prismaService: PrismaService) => {
      return new EnterpriseRepository(prismaService);
    },
    inject: [PrismaService],
  },
  {
    provide: ClientRepository,
    useFactory: (prismaService: PrismaService) => {
      return new ClientRepository(prismaService);
    },
    inject: [PrismaService],
  }],
  exports: [UserRepository, EnterpriseRepository, ClientRepository],
})
export class DatabaseModule {}