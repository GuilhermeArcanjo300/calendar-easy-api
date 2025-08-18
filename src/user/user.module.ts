import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/database/database.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './repositories/user.reposity';
import { UserGuard } from './guards/user.guard';

@Module({
    imports: [DatabaseModule],
    controllers: [UserController],
    providers: [UserService, UserGuard],
    exports: [UserService],
})
export class UserModule {}
