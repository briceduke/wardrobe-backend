import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {
	@Field()
	@IsEmail()
	readonly email: string;

	@Field()
	@IsNotEmpty()
	@IsString()
	@MinLength(8)
	readonly password: string;
}
