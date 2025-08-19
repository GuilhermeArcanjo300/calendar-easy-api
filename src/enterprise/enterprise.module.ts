import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/database/database.module';
import { EnterpriseService } from './enterprise.service';
import { EnterpriseController } from './enterprise.controller';

@Module({
    imports: [DatabaseModule],
    controllers: [EnterpriseController],
    providers: [EnterpriseService],
    exports: [EnterpriseService],
})
export class EnterpriseModule {} 