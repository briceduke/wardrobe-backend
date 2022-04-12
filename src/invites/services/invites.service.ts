import { BadRequestException, Injectable } from "@nestjs/common";
import { Invite } from "../models/invite.model";
import { InviteDocument } from "../models/invite.schema";
import { InvitesRepository } from "../repositories/invites.repository";
import { v4 } from "uuid";

@Injectable()
export class InvitesService {
    constructor(private readonly invitesRepo: InvitesRepository) {}

    private toModel(inviteDoc: InviteDocument): Invite {
		return {
			_id: inviteDoc._id.toHexString(),
            userId: inviteDoc.userId,
            inviteCode: inviteDoc.inviteCode,
            ownerId: inviteDoc.ownerId
		};
	}

    async createInvite(ownerId: string): Promise<Invite> {
        const ownerInvites = await this.invitesRepo.find({ ownerId });

        if (ownerInvites.length > 3) throw new BadRequestException('You already have 4 invites!');

        const inviteCode = v4();

        const inviteDoc = await this.invitesRepo.create({
            ownerId,
            inviteCode,
            userId: ''
        });

        return this.toModel(inviteDoc);
    }
}