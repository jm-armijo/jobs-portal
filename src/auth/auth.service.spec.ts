import * as mongoose from 'mongoose';
import { Model } from 'mongoose';

import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

describe('AuthService', () => {
    let authService: AuthService;
    let mockUsersService;
    let mockJwtService;

    beforeEach(async () => {
        mockJwtService = new class {
            sign() {};
        };
        mockUsersService = new class {
            getUser() {};
        };

        const moduleRef: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: JwtService,
                    useValue: mockJwtService,
                },
                {
                    provide: UsersService,
                    useValue: mockUsersService,
                },
            ],
        }).compile();

        authService = moduleRef.get<AuthService>(AuthService);
    });

    describe('validateUser', () => {
        it('should return a user object without the password', async () => {
            let expectedUser: any = {};
            expectedUser.id       = "98765";
            expectedUser.name     = "Test User";
            expectedUser.username = "test";
            expectedUser.role     = "any";
            const expectedResult = expectedUser;

            let mockedUser: any = {};
            mockedUser.id       = "98765";
            mockedUser.name     = "Test User";
            mockedUser.username = "test";
            mockedUser.password = "pwd";
            mockedUser.role     = "any";
            jest.spyOn(mockUsersService, 'getUser').mockResolvedValue(mockedUser);
            const actualResult = await authService.validateUser('test', 'pwd');

            expect(actualResult).toEqual(expectedResult);
        });

        it('should return null if passwords do not match', async () => {
            const expectedResult = null

            let mockedUser: any = {};
            mockedUser.id       = "98765";
            mockedUser.name     = "Test User";
            mockedUser.username = "test";
            mockedUser.password = "pwd";
            mockedUser.role     = "any";
            jest.spyOn(mockUsersService, 'getUser').mockResolvedValue(mockedUser);
            const actualResult = await authService.validateUser('test', 'wrong password');

            expect(actualResult).toEqual(expectedResult);
        });

        it('should return null if user not found', async () => {
            const expectedResult = null

            let mockedUser = null
            jest.spyOn(mockUsersService, 'getUser').mockResolvedValue(mockedUser);
            const actualResult = await authService.validateUser('test', 'pwd');

            expect(actualResult).toEqual(expectedResult);
        });
    });

    describe('login', () => {
        it('should return a user object without the password', async () => {
            let mockedUser: any = {};
            mockedUser.id       = "98765";
            mockedUser.name     = "Test User";
            mockedUser.username = "test";
            mockedUser.password = "pwd";
            mockedUser.role     = "any";

            let hash = JSON.stringify({username: mockedUser.username, sub: mockedUser.password});
            jest.spyOn(mockJwtService, 'sign').mockResolvedValue(hash);

            const actualResponse = await authService.login(mockedUser);
            const expectedResponse = {access_token: hash};
            expect(actualResponse).toEqual(expectedResponse);
        });
    });
});
