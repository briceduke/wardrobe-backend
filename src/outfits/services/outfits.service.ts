import { Injectable } from "@nestjs/common";
import { OutfitDocument } from "../models/outfit.schema";
import { Model } from "mongoose";
import { Outfit } from "../models/outfit.model";
import { OutfitsRepository } from "../repositories/outfits.repository";
import { UseOutfitInput } from "../dto/input/use-outfit.input";

@Injectable()
export class OutfitsService {
    constructor(private readonly outfitsRepo: OutfitsRepository) {}

    private toModel(outfitDoc: OutfitDocument): Outfit {
		return {
			_id: outfitDoc._id.toHexString(),
			clothesIds: outfitDoc.clothesIds,
            ownerId: outfitDoc.ownerId,
            rating: outfitDoc.rating,
            lastWorn: outfitDoc.lastWorn,
            timesWorn: outfitDoc.timesWorn
		};
	}

    // internal only method, does not check for validity of clothes IDs
    async createOutfit(clothesIds: string[], ownerId: string): Promise<Outfit> {
        const outfitDoc = await this.outfitsRepo.create({
            clothesIds,
            ownerId,
            timesWorn: 0,
            rating: 0,
            lastWorn: new Date(),
        });

        return this.toModel(outfitDoc);
    }

    async useOutfit(useOutfitData: UseOutfitInput, ownerId: string): Promise<Outfit> {
        let outfitDoc: OutfitDocument;

        if (useOutfitData.didWear) {
            outfitDoc = await this.outfitsRepo.findOneAndUpdate({ _id: useOutfitData._id, ownerId }, {
                $set: {
                    ...useOutfitData,
                    lastWorn: Date.now()
                },
                $inc: { timesWorn: 1 }
            });
        } else {
            outfitDoc = await this.outfitsRepo.findOneAndUpdate({ _id: useOutfitData._id, ownerId }, {
                $set: {
                    ...useOutfitData,
                },
            });
        }

        return this.toModel(outfitDoc);
    }
}