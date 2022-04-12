import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/database/abstract.schema';

@Schema({ versionKey: false })
export class UserDocument extends AbstractDocument {
	@Prop()
	username: string;

	@Prop()
	password: string;

	@Prop()
	referralCode: string;

	@Prop()
	referralUses: number;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
