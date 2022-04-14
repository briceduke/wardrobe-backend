import { Body, Controller, Patch, UseGuards } from "@nestjs/common";
import { CurrentUser } from "../../auth/decorators/current-user.decorator";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { User } from "../../users/models/user.model";
import { UseOutfitInput } from "../dto/input/use-outfit.input";
import { Outfit } from "../models/outfit.model";
import { OutfitsService } from "../services/outfits.service";

@Controller('clothes')
export class OutfitsController {
    constructor(private readonly outfitsService: OutfitsService) {}

    @UseGuards(JwtAuthGuard)
    @Patch()
    async useOutfit(@Body() useOutfitData: UseOutfitInput, @CurrentUser() user: User): Promise<Outfit> {
        return this.outfitsService.useOutfit(useOutfitData, user._id);
    }
}