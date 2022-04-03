import { Field, ObjectType } from '@nestjs/graphql';
import { AbstractModel } from 'src/common/abstract.model';

@ObjectType()
export class Clothes extends AbstractModel {
	@Field()
	readonly name: string;

	@Field()
	readonly userId: string;

	@Field()
	readonly imageUri: string;
}
