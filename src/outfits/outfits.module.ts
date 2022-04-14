import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { OutfitsController } from "./controllers/outfits.controller";
import { Outfit } from "./models/outfit.model";
import { OutfitSchema } from "./models/outfit.schema";
import { OutfitsRepository } from "./repositories/outfits.repository";
import { OutfitsResolver } from "./resolvers/outfits.resolver";
import { OutfitsService } from "./services/outfits.service";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Outfit.name, schema: OutfitSchema }])
    ],
    controllers: [OutfitsController],
    providers: [OutfitsRepository, OutfitsService, OutfitsResolver]
})
export class OutfitsModule {}