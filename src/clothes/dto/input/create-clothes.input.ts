import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@InputType()
export class CreateClothesInput {
	@Field()
	@IsNotEmpty()
	@IsString()
	name: string;

	@Field(() => GraphQLUpload)
	@IsNotEmpty()
	file: FileUpload;
}
