import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { EnterpriseModule } from './enterprise/enterprise.module';
import { ClientModule } from './client/client.module';

@Module({
  imports: [AuthModule, UserModule, EnterpriseModule, ClientModule],
})
export class AppModule {}
