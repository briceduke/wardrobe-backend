import { Resolver } from '@nestjs/graphql';

import { ClothesService } from '../services/clothes.service';

@Resolver()
export class ClothesResolver {
	constructor(private readonly clothesService: ClothesService) {}
}
