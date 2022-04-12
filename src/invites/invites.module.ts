import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Invite } from './models/invite.model';
import { InviteSchema } from './models/invite.schema';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: Invite.name, schema: InviteSchema }]),
	],
	providers: [],
	exports: [],
})
export class UsersModule {}
