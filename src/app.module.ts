import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			validationSchema: Joi.object({
				PORT: Joi.number().required(),
				JWT_EXP: Joi.number().required(),
				JWT_SECRET: Joi.string().required(),
				MONGO_URI: Joi.string().required(),
			}),
		}),
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
