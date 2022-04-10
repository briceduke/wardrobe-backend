import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { GqlAuthGuard } from '../../auth/guards/gql-auth.guard';
import { User } from '../../users/models/user.model';
import { GetClothesArgs } from '../dto/args/get-clothes.dto';
import { CreateClothesInput } from '../dto/input/create-clothes.input';
import { UpdateClothesInput } from '../dto/input/update-clothes.input';
import { Clothes } from '../models/clothes.model';
import { ClothesService } from '../services/clothes.service';

@Resolver(() => Clothes)
export class ClothesResolver {
	constructor(private readonly clothesService: ClothesService) {}

	@UseGuards(GqlAuthGuard)
	@Mutation(() => Clothes)
	async createClothes(
		@Args("createClothesData") createClothesData: CreateClothesInput,
		@CurrentUser() user: User
	) {
		return this.clothesService.createClothes(createClothesData, user._id);
	}

	@UseGuards(GqlAuthGuard)
	@Mutation(() => Clothes)
	async updateClothes(
		@Args("updateClothesData") updateClothesData: UpdateClothesInput,
		@CurrentUser() user: User
	) {
		return this.clothesService.updateClothes(updateClothesData, user._id);
	}

	@UseGuards(GqlAuthGuard)
	@Query(() => Clothes, { name: "clothes" })
	async getClothesItem(
		@Args() getClothesArgs: GetClothesArgs,
		@CurrentUser() user: User
	) {
		return this.clothesService.getItem(getClothesArgs, user._id);
	}

	@UseGuards(GqlAuthGuard)
	@Query(() => [Clothes], { name: "clothes" })
	async getClothes(@CurrentUser() user: User) {
		return this.clothesService.getClothes(user._id);
	}
}
