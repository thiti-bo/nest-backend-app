import { PrismaModule } from './../prisma/prisma.module';
import { Module } from '@nestjs/common';
import { PositionService } from './position.service';
import { PositionController } from './position.controller';

@Module({
  controllers: [PositionController],
  providers: [PositionService],
  imports:[PrismaModule]
})
export class PositionModule {}
