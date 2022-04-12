import { Field, ObjectType } from '@nestjs/graphql';

import { AbstractModel } from '../../common/abstract.model';

@ObjectType()
export class Invite extends AbstractModel {
	@Field()
	readonly inviteCode: string;

	@Field()
	readonly userId: string;
}
