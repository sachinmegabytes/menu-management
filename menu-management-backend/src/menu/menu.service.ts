import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Menu, Prisma } from '@prisma/client';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}

  // Get all menus with their children
  async getMenus() {
    const menus = await this.prisma.menu.findMany({
      orderBy: { depth: 'asc' },
    });

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

  // Create a new menu item
  // async createMenu(data: Prisma.MenuCreateInput, parentId?: string | null) {
  //   return this.prisma.menu.create({
  //     data: {
  //       name: data.name,
  //       depth: data.depth,
  //       // Handle parent relation: if parentId is present, connect to parent; otherwise, create as a root item
  //       ...(parentId && parentId !== ''
  //         ? { parent: { connect: { id: parentId } } } // Connect to parent if parentId is provided
  //         : {}), // No parentId means it's a root menu item
  //     },
  //   });
  // }

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

  // Update an existing menu item
  async updateMenu(
    id: string,
    data: Prisma.MenuUpdateInput,
    parentId?: string | null,
  ) {
    return this.prisma.menu.update({
      where: { id },
      data: {
        name: data.name,
        depth: data.depth,
        // Handle parent relation: connect to parent if parentId is provided, otherwise disconnect
        ...(parentId && parentId !== ''
          ? { parent: { connect: { id: parentId } } } // Connect to new parent if parentId is provided
          : { parent: { disconnect: true } }), // If no parentId, disconnect and make it a root item
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
