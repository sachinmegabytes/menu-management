import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { Prisma } from '@prisma/client';
import { UpdateMenuDto } from './dto/UpdateMenu.dto';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  // Get all menus
  @Get()
  async getMenus() {
    return this.menuService.getMenus();
  }

  // Get specific menu
  @Get(':id')
  async getMenu(@Param('id') id: string) {
    return this.menuService.getMenuById(id);
  }

  // Create a new menu item
  @Post()
  async createMenu(@Body() data: Prisma.MenuCreateInput) {
    return this.menuService.createMenu(data);
  }

  @Patch(':id')
  async updateMenu(
    @Param('id') id: string,
    @Body() updateMenuDto: UpdateMenuDto, // Use DTO instead of Prisma type
  ) {
    return this.menuService.updateMenu(id, updateMenuDto);
  }

  // Delete a menu item
  @Delete(':id')
  async deleteMenu(@Param('id') id: string) {
    return this.menuService.deleteMenu(id);
  }
}
