import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/database/database.module';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { EnterpriseModule } from 'src/enterprise/enterprise.module';

@Module({
    imports: [DatabaseModule, EnterpriseModule],
    controllers: [ServiceController],
    providers: [ServiceService],
    exports: [ServiceService],
})
export class ServiceModule {}


