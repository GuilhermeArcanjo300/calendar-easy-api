import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { EnterpriseModule } from './enterprise/enterprise.module';

@Module({
  imports: [AuthModule, UserModule, EnterpriseModule],
})
export class AppModule {}
