import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ShopCategories, ShopItem } from '@prisma/client'
import { ItemCreateDto } from './dto/itemcreate.dto';
import { error } from 'console';

@Injectable()
export class ShopItemService {
    constructor(private prisma: PrismaService) {
    }

    async FetchCategories(): Promise<string[]> {
        return Object.values(ShopCategories);
    }

    async CreateItem(dto: ItemCreateDto, itemFN: string) {
        const category = dto.category as keyof typeof ShopCategories;
        const item = await this.prisma.shopItem.create({
            data: {
                title: dto.title,
                description: dto.description,
                price: dto.price,
                category: category,
                image_url: itemFN
            },
        });
        if (!item) {
            console.error("Item wasnt created", 455);
        }

        return item;
    }

    async GetAllItems() {
        return this.prisma.shopItem.findMany();
    }

    async UpdateItem(dto: ItemCreateDto, itemFN: string, itemID: number) {
        const category = dto.category as keyof typeof ShopCategories;
        let item: ShopItem
        if (itemFN !== null) {
            item = await this.prisma.shopItem.update({
                where: { id: itemID },
                data: {
                    title: dto.title,
                    description: dto.description,
                    price: dto.price,
                    category: category,
                    image_url: itemFN
                }
            })
        } else {
            item = await this.prisma.shopItem.update({
                where: { id: itemID },
                data: {
                    title: dto.title,
                    description: dto.description,
                    price: dto.price,
                    category: category
                }
            })
        }

        if (!item) {
            console.error("Item wasnt updated", 455);
        } else {
            return item;
        }
    }
}
