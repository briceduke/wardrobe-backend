import { Test, TestingModule } from '@nestjs/testing';

import { User } from '../models/user.model';
import { UsersResolver } from '../resolvers/users.resolver';
import { UsersService } from '../services/users.service';
import { userStub } from './stubs/user.stub';

jest.mock("../services/users.service");

describe("UsersResolver", () => {
	let resolver: UsersResolver;
	let service: UsersService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [UsersResolver, UsersService],
		}).compile();

		resolver = module.get<UsersResolver>(UsersResolver);
		service = module.get<UsersService>(UsersService);

		jest.clearAllMocks();
	});

	it("should be defined", () => {
		expect(resolver).toBeDefined();
		expect(service).toBeDefined();
	});

	describe("getUser", () => {
		describe("when getUser is called", () => {
			let user: User;

			const payload = {
				_id: userStub()._id,
			};

			beforeEach(async () => {
				user = await resolver.getUser(payload);
			});

			test("then it should call the service", () => {
				expect(service.getUser).toHaveBeenCalledWith(payload);
			});

			test("then it should return a user", () => {
				expect(user).toEqual("hi");
			});
		});
	});
});
