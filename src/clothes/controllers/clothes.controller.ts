import { Body, Controller, Get, Patch, Post, UseGuards } from "@nestjs/common";
import { CurrentUser } from "src/auth/decorators/current-user.decorator";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { LocalAuthGuard } from "src/auth/guards/local-auth.guard";
import { User } from "src/users/models/user.model";
import { GetClothesArgs } from "../dto/args/get-clothes.dto";
import { CreateClothesInput } from "../dto/input/create-clothes.input";
import { UpdateClothesInput } from "../dto/input/update-clothes.input";
import { ClothesService } from "../services/clothes.service";

@Controller("clothes")
export class ClothesController {
    constructor(private readonly clothesService: ClothesService) {}

    @UseGuards(LocalAuthGuard)
    @Post()
    async createClothes(
		@Body() createClothesData: CreateClothesInput,
		@CurrentUser() user: User
	) {
		return this.clothesService.createClothes(createClothesData, user._id);
	}

    @UseGuards(JwtAuthGuard)
    @Patch()
    async updateClothes(
		@Body() updateClothesData: UpdateClothesInput,
		@CurrentUser() user: User
	) {
		return this.clothesService.updateClothes(updateClothesData, user._id);
	}

    @UseGuards(JwtAuthGuard)
	@Get()
	async getClothesItem(
		@Body() getClothesArgs: GetClothesArgs,
		@CurrentUser() user: User
	) {
		return this.clothesService.getItem(getClothesArgs, user._id);
	}

	@UseGuards(JwtAuthGuard)
	@Get()
	async getClothes(@CurrentUser() user: User) {
		return this.clothesService.getClothes(user._id);
	}
}