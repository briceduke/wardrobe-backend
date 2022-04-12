import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Invite } from './models/invite.model';
import { InviteSchema } from './models/invite.schema';
import { InvitesRepository } from './repositories/invites.repository';
import { InvitesService } from './services/invites.service';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: Invite.name, schema: InviteSchema }]),
	],
	providers: [InvitesRepository, InvitesService],
	exports: [],
})
export class UsersModule {}
