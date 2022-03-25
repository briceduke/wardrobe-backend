import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
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
		GraphQLModule.forRoot<ApolloDriverConfig>({
			autoSchemaFile: true,
			driver: ApolloDriver,
		}),
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
