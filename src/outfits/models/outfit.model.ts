import { Field, ObjectType } from "@nestjs/graphql";
import { AbstractModel } from "src/common/abstract.model";

@ObjectType()
export class Outfit extends AbstractModel {
    @Field()
    readonly ownerId: string;

    @Field()
    readonly timesWorn: number;

    @Field()
    readonly rating: number;

    @Field(() => [String])
    readonly clothesIds: string[];

    @Field(() => Date)
    readonly lastWorn: Date;
}