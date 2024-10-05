import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { Prisma } from '@prisma/client';

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

  // Update an existing menu
  @Put(':id')
  async updateMenu(
    @Param('id') id: string,
    @Body() data: Prisma.MenuUpdateInput,
  ) {
    return this.menuService.updateMenu(id, data);
  }

  // Delete a menu item
  @Delete(':id')
  async deleteMenu(@Param('id') id: string) {
    return this.menuService.deleteMenu(id);
  }
}
