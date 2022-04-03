import { Module } from '@nestjs/common';

import { ClothesResolver } from './resolvers/clothes.resolver';
import { ClothesService } from './services/clothes.service';

@Module({
	providers: [ClothesResolver, ClothesService],
})
export class ClothesModule {}
