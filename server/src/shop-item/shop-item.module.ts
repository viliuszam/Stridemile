import { Module } from '@nestjs/common';
import { ShopItemController } from './shop-item.controller';
import { ShopItemService } from './shop-item.service';

@Module({
  controllers: [ShopItemController],
  providers: [ShopItemService]
})
export class ShopItemModule { }
