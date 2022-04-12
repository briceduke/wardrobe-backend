import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {
	@Field()
	@IsNotEmpty()
	@IsString()
	@MinLength(4)
	readonly username: string;

	@Field()
	@IsNotEmpty()
	@IsString()
	@MinLength(8)
	readonly password: string;
}
