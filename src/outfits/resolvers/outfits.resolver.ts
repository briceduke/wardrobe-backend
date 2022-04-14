import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { CurrentUser } from "src/auth/decorators/current-user.decorator";
import { GqlAuthGuard } from "src/auth/guards/gql-auth.guard";
import { User } from "src/users/models/user.model";
import { UseOutfitInput } from "../dto/input/use-outfit.input";
import { Outfit } from "../models/outfit.model";
import { OutfitsService } from "../services/outfits.service";

@Resolver()
export class OutfitsResolver {
    constructor(private readonly outfitsService: OutfitsService) {}

    @Mutation(() => Outfit, { name: 'use' })
    @UseGuards(GqlAuthGuard)
    async useOutfit(@Args('useOutfitData') useOutfitData: UseOutfitInput, @CurrentUser() user: User): Promise<Outfit> {
        return this.outfitsService.useOutfit(useOutfitData, user._id);
    }
}