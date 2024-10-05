import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Menu, Prisma } from '@prisma/client';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}

  // Get all menus with their children
  async getMenus() {
    const menus = await this.prisma.menu.findMany({});

    // Convert flat menu array into nested structure
    return this.buildMenuTree(menus);
  }

  private buildMenuTree(
    menuItems: Menu[],
    parentId: string | null = null,
  ): any[] {
    return menuItems
      .filter((menu) => menu.parentId === parentId) // Get all root-level or child items based on parentId
      .map((menu) => ({
        id: menu.id,
        title: menu.name,
        depth: menu.depth,
        children: this.buildMenuTree(menuItems, menu.id), // Recursively find children
      }));
  }
  // Get a specific menu by ID
  async getMenuById(id: string) {
    return this.prisma.menu.findUnique({
      where: { id },
      include: {
        children: true,
      },
    });
  }

  async createMenu(data: { name: string; depth: number; parentId?: string }) {
    const { parentId, name, depth } = data;

    // If `parentId` is provided, create as child; otherwise, as a root menu item
    const newMenu = await this.prisma.menu.create({
      data: {
        name,
        depth,
        parent: parentId ? { connect: { id: parentId } } : undefined, // Connect to parent if parentId exists
      },
    });

    return newMenu;
  }

  async updateMenu(
    id: string,
    data: { name?: string; depth?: number }, // Make both fields optional
  ) {
    const menu = await this.prisma.menu.findUnique({
      where: { id },
    });

    return this.prisma.menu.update({
      where: { id },
      data: {
        ...(data.name && { name: data.name }), // Update `name` if provided
        ...(data.depth && { depth: data.depth }), // Update `depth` if provided
      },
    });
  }

  // Delete a menu item
  async deleteMenu(id: string) {
    return this.prisma.menu.delete({
      where: { id },
    });
  }
}
