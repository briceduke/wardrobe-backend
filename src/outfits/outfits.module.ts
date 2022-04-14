import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Outfit } from "./models/outfit.model";
import { OutfitSchema } from "./models/outfit.schema";
import { OutfitsRepository } from "./repositories/outfits.repository";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Outfit.name, schema: OutfitSchema }])
    ],
    controllers: [],
    providers: [OutfitsRepository]
})
export class OutfitsModule {}