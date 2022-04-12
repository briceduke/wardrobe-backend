import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

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

	@Field()
	@IsNotEmpty()
	@IsString()
	@MinLength(8)
	@MaxLength(8)
	readonly referralCode: string;
}
