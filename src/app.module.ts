import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DepartmentModule } from './department/department.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [DepartmentModule, ProfileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
