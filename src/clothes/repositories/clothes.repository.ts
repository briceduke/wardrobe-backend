import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AbstractRepository } from '../../database/abstract.repository';
import { Clothes } from '../models/clothes.model';
import { ClothesDocument } from '../models/clothes.schema';

@Injectable()
export class ClothesRepository extends AbstractRepository<ClothesDocument> {
	constructor(@InjectModel(Clothes.name) clothesModel: Model<ClothesDocument>) {
		super(clothesModel);
	}
}
