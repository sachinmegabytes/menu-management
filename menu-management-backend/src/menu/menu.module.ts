import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { PrismaModule } from '../../prisma/prisam.module';
@Module({
  imports: [PrismaModule], // Import PrismaModule to make PrismaService available
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}
