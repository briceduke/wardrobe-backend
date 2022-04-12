import { Field, ObjectType } from '@nestjs/graphql';

import { AbstractModel } from '../../common/abstract.model';

@ObjectType()
export class User extends AbstractModel {
	@Field()
	readonly username: string;

	@Field()
	readonly referralCode: string;

	@Field()
	readonly referralUses: number;
}
