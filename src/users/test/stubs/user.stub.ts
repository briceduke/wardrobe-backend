import { User } from 'src/users/models/user.model';

export const userStub = (): User => {
	return {
		_id: "123",
		username: "testing",
	};
};
