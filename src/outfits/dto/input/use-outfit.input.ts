import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsNumber, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';

@InputType()
export class UseOutfitInput {
	@Field()
	@IsNotEmpty()
	@IsBoolean()
	readonly didWear: boolean;

	@Field()
	@IsNotEmpty()
	@IsNumber()
	@Min(1)
	@Max(5)
	readonly rating: number;
}
