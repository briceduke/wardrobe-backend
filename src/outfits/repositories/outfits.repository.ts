import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AbstractRepository } from '../../database/abstract.repository';
import { Outfit } from '../models/outfit.model';
import { OutfitDocument } from '../models/outfit.schema';

@Injectable()
export class OutfitsRepository extends AbstractRepository<OutfitDocument> {
	constructor(@InjectModel(Outfit.name) outfitModel: Model<OutfitDocument>) {
		super(outfitModel);
	}
}
