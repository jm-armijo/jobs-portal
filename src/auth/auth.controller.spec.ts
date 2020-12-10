import { Test, TestingModule } from '@nestjs/testing';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
    let authController: AuthController;
    let mockAuthService;

    beforeEach(async () => {
        mockAuthService = new class {
            login() {};
        };

        const app: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                {
                    provide: AuthService,
                    useValue: mockAuthService,
                },
            ],
        }).compile();

        authController = app.get<AuthController>(AuthController);
    });

    it('should return valid token on success', async () => {
        let response = {access_token: "12345"};
        jest.spyOn(mockAuthService, 'login').mockResolvedValue(response);

        let mockedUser: any = {};
        mockedUser.id       = "98765";
        mockedUser.name     = "Test User";
        mockedUser.username = "test";
        mockedUser.password = "pwd";
        mockedUser.role     = "any";

        let mockedRequest: any = {};
        mockedRequest.user = mockedUser;

        const expectedValue = response;
        const actualValue = await authController.login(mockedRequest)
        expect(actualValue).toEqual(expectedValue);
    });

    it('should return error 401 on wrong user', async () => {
        let response = {statusCode: 401, message: "Unauthorized"};
        jest.spyOn(mockAuthService, 'login').mockResolvedValue(response);

        let mockedUser: any = {};
        mockedUser.id       = "98765";
        mockedUser.name     = "Test User";
        mockedUser.username = "invalid_user";
        mockedUser.password = "pwd";
        mockedUser.role     = "any";

        let mockedRequest: any = {};
        mockedRequest.user = mockedUser;

        const expectedValue = response;
        const actualValue = await authController.login(mockedRequest)
        expect(actualValue).toEqual(expectedValue);
    });
});
