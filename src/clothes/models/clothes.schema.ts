import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/database/abstract.schema';

@Schema({ versionKey: false })
export class ClothesDocument extends AbstractDocument {
	@Prop()
	name: string;

	@Prop()
	userId: string;

	@Prop()
	imageUri: string;
}

export const ClothesSchema = SchemaFactory.createForClass(ClothesDocument);
