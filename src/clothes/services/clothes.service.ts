import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { createWriteStream } from 'fs';
import { v4 } from 'uuid';

import { GetClothesArgs } from '../dto/args/get-clothes.dto';
import { CreateClothesInput } from '../dto/input/create-clothes.input';
import { UpdateClothesInput } from '../dto/input/update-clothes.input';
import { Clothes } from '../models/clothes.model';
import { ClothesDocument } from '../models/clothes.schema';
import { ClothesRepository } from '../repositories/clothes.repository';

@Injectable()
export class ClothesService {
	constructor(private readonly clothesRepo: ClothesRepository) {}

	private toModel(clothesDoc: ClothesDocument): Clothes {
		return {
			_id: clothesDoc._id.toHexString(),
			name: clothesDoc.name,
			imageUri: clothesDoc.imageUri,
			userId: clothesDoc.userId,
		};
	}

	async createClothes(
		clothesData: CreateClothesInput,
		userId: string
	): Promise<Clothes> {
		const fileName = v4();

		const uploaded = new Promise(async (res, rej) =>
			clothesData.file
				.createReadStream()
				.pipe(createWriteStream(`../../../uploads/${fileName}`))
				.on("finish", () => res(true))
				.on("error", () => res(false))
		);

		if (!uploaded)
			throw new InternalServerErrorException(
				"uhh oopsie image upload failed lolz"
			);

		const clothesDoc = await this.clothesRepo.create({
			imageUri: fileName,
			name: clothesData.name,
			userId,
		});

		return this.toModel(clothesDoc);
	}

	async updateClothes(updateClothesData: UpdateClothesInput, userId: string) {
		const fileName = v4();

		const uploaded = new Promise(async (res, rej) =>
			updateClothesData.file
				.createReadStream()
				.pipe(createWriteStream(`../../../uploads/${fileName}`))
				.on("finish", () => res(true))
				.on("error", () => res(false))
		);

		if (!uploaded)
			throw new InternalServerErrorException(
				"uhh oopsie image upload failed lolz"
			);

		const clothesDoc = await this.clothesRepo.findOneAndUpdate(
			{ _id: updateClothesData._id, userId },
			{
				$set: {
					imageUri: fileName,
					...updateClothesData,
				},
			}
		);

		return this.toModel(clothesDoc);
	}

	async getItem(getClothesArgs: GetClothesArgs, userId: string) {
		const clothesDoc = await this.clothesRepo.findOne({
			...getClothesArgs,
			userId,
		});

		return this.toModel(clothesDoc);
	}

	async getClothes(userId: string) {
		const clothesDocs = await this.clothesRepo.find({ userId });

		return clothesDocs.map((doc) => this.toModel(doc));
	}
}
