import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { AbstractDocument } from "../../database/abstract.schema";

@Schema({ versionKey: false })
export class OutfitDocument extends AbstractDocument {
    @Prop()
    ownerId: string;

    @Prop()
    timesWorn: number;

    @Prop()
    rating: number;

    @Prop()
    clothesIds: string[];

    @Prop()
    lastWord: Date;
}

export const OutfitSchema = SchemaFactory.createForClass(OutfitDocument);