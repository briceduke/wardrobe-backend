import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/database/abstract.schema';

@Schema({ versionKey: false })
export class InviteDocument extends AbstractDocument {
	@Prop()
	inviteCode: string;

	@Prop({ default: '' })
	userId: string;

	@Prop()
	ownerId: string;
}

export const InviteSchema = SchemaFactory.createForClass(InviteDocument);
