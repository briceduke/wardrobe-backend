import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class DeleteClothesInput {
	@Field()
	@IsNotEmpty()
	@IsString()
	_id: string;
}
