
import { Module } from "@nestjs/common";
import { CacheController } from "../cache.controller";
import { CacheService } from "../cache.service";
import { CacheService as _CacheService } from "./cache.service";

@Module({
    controllers: [CacheController],
    providers: [{ provide: CacheService, useValue: {} }]
})
export class CacheModule { }