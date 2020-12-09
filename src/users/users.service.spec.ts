import * as mongoose from 'mongoose';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { UsersService } from './users.service';
import { User, UserSchema } from './user.model';

export class ModelMock {
    public async save(): Promise<void> {}
}

describe('UsersService', () => {
    let usersService: UsersService;
    let userModel;

    beforeEach(async () => {

        userModel = mongoose.model('Users', UserSchema);

        const moduleRef: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                {
                    provide: getModelToken('User'),
                    useValue: userModel,
                },
            ],
        }).compile();

        usersService = moduleRef.get<UsersService>(UsersService);
    });

    describe('getUser', () => {

        it('should return a user object', async () => {
            let mockedUser: any = {};
            mockedUser.id       = "98765";
            mockedUser.name     = "Test User";
            mockedUser.username = "test";
            mockedUser.password = "pwd";
            mockedUser.role     = "any";

            let mockedResponse = new class {
                exec(): any {
                    return mockedUser;
                }
            }

            jest.spyOn(userModel, 'findOne').mockReturnValue(mockedResponse);

            const actualResult = await usersService.getUser('test');
            const expectedResult = mockedUser;
            expect(actualResult).toEqual(expectedResult);
        });

        it('should return an object even if all values are empty', async () => {
            let mockedUser: any = {};
            mockedUser.id       = "98765";
            mockedUser.name     = "";
            mockedUser.username = "";
            mockedUser.password = "";
            mockedUser.role     = "";

            let mockedResponse = new class {
                exec(): any {
                    return mockedUser;
                }
            }

            jest.spyOn(userModel, 'findOne').mockReturnValue(mockedResponse);

            const actualResult = await usersService.getUser('test');
            const expectedResult = mockedUser;
            expect(actualResult).toEqual(expectedResult);
        });

        it('should return null if user not found', async () => {
            let mockedResponse = new class {
                exec(): any {
                    return null;
                }
            }

            jest.spyOn(userModel, 'findOne').mockReturnValue(mockedResponse);

            const actualResult = await usersService.getUser('test');
            const expectedResult = null;
            expect(actualResult).toEqual(expectedResult);
        });

        it('should return null on error', async () => {
            let mockedResponse = new class {
                exec(): any {
                    return null;
                }
            }

            jest.spyOn(userModel, 'findOne').mockImplementation(() => { throw new Error("Fake error"); });

            const actualResult = await usersService.getUser('test');
            const expectedResult = null;
            expect(actualResult).toEqual(expectedResult);
        });

        it('should return null if empty user passed', async () => {
            let mockedResponse = new class {
                exec(): any {
                    return null;
                }
            }

            jest.spyOn(userModel, 'findOne').mockReturnValue(mockedResponse);

            const actualResult = await usersService.getUser('');
            const expectedResult = null;
            expect(actualResult).toEqual(expectedResult);
        });

    });
});
