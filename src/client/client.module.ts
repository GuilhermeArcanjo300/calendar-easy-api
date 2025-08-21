import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/database/database.module';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { EnterpriseModule } from 'src/enterprise/enterprise.module';

@Module({
    imports: [DatabaseModule, EnterpriseModule],
    controllers: [ClientController],
    providers: [ClientService],
    exports: [ClientService],
})
export class ClientModule {}


