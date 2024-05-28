import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards, UseInterceptors, UploadedFiles, Patch, ParseIntPipe } from "@nestjs/common";
import { ShopItemService } from './shop-item.service';
import { AuthGuard } from "@nestjs/passport";
import { AnyFilesInterceptor } from "@nestjs/platform-express";
import { diskStorage, Multer } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');
import { ItemCreateDto } from "./dto/itemcreate.dto";
import { Request } from 'express';

@Controller('shop-item')
export class ShopItemController {
    constructor(private shopItemService: ShopItemService) { }


    @UseGuards(AuthGuard('jwt'))
    @Post('create')
    @UseInterceptors(AnyFilesInterceptor({
        storage: diskStorage({
            destination: (req, file, cb) => {
                var destination = ""
                destination = './uploads/itemimages'
                cb(null, destination);
            },
            filename: (req, file, cb) => {
                const filename: string =
                    path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
                const extension: string = path.parse(file.originalname).ext;

                cb(null, `${filename}${extension}`);
            },
        }),
    }))
    async CreateItem(@Body() dto: ItemCreateDto, @UploadedFiles() files: Array<Multer.File>) {
        var itemFN = null;
        for (let i = 0; i < files.length; i++) {
            itemFN = process.env.ITEM_PHOTO_PATH + files[i].filename;
        }

        return this.shopItemService.CreateItem(dto, itemFN);
    }

    @Get('categories')
    async FetchCategories(@Req() req) {
        return await this.shopItemService.FetchCategories();
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('all')
    async FetchItems(@Req() req) {
        return await this.shopItemService.GetAllItems();
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('getMyItems')
    async FetchMyItems(@Req() req) {
        return await this.shopItemService.GetAllMyItems(req.user.id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch('edit/:itemId')
    @UseInterceptors(AnyFilesInterceptor({
        storage: diskStorage({
            destination: (req, file, cb) => {
                var destination = ""
                destination = './uploads/itemimages'
                cb(null, destination);
            },
            filename: (req, file, cb) => {
                const filename: string =
                    path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
                const extension: string = path.parse(file.originalname).ext;

                cb(null, `${filename}${extension}`);
            },
        }),
    }))
    async EditItem(@Param('itemId', ParseIntPipe) itemId: number, @Body() dto: ItemCreateDto, @UploadedFiles() files: Array<Multer.File>) {
        var itemFN = null;
        for (let i = 0; i < files.length; i++) {
            itemFN = process.env.ITEM_PHOTO_PATH + files[i].filename;
        }

        return this.shopItemService.UpdateItem(dto, itemFN, itemId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('buy')
    async BuyItem(@Req() req, @Body() body) {
        const userId = req.user.id;
        console.log("AAA")
        return this.shopItemService.BuyItem(userId, body.itemId, body.itemPrice, body.userP);
    }
}
