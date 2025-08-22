import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { EnterpriseModule } from './enterprise/enterprise.module';
import { ClientModule } from './client/client.module';
import { ServiceModule } from './service/service.module';
import { CalendarModule } from './calendar/calendar.module';

@Module({
  imports: [AuthModule, UserModule, EnterpriseModule, ClientModule, ServiceModule, CalendarModule],
})
export class AppModule {}
