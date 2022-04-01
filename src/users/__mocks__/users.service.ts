import { userStub } from '../test/stubs/user.stub';

export const UsersService = jest.fn().mockReturnValue({
	getUser: jest.fn().mockResolvedValue("hi"),
	createUser: jest.fn().mockResolvedValue(userStub()),
	validateUser: jest.fn().mockResolvedValue(userStub()),
});
