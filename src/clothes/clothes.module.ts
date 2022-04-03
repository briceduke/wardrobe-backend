import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Clothes } from './models/clothes.model';
import { ClothesSchema } from './models/clothes.schema';
import { ClothesResolver } from './resolvers/clothes.resolver';
import { ClothesService } from './services/clothes.service';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: Clothes.name, schema: ClothesSchema }]),
	],
	providers: [ClothesResolver, ClothesService],
})
export class ClothesModule {}
