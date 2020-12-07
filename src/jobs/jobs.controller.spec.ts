import { Test, TestingModule } from '@nestjs/testing';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';

export class JobsServiceMock {
    public async insertJob(
        title: string,
        description: string,
        expiredAt: string
    ): Promise<void> {}
}

describe('JobsController', () => {
    let jobsController: JobsController;
    let jobsService: JobsService;

    beforeEach(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            controllers: [JobsController],
            providers: [{
                provide: JobsService,
                useClass: JobsServiceMock,
            }],
        }).compile();

        jobsService = moduleRef.get<JobsService>(JobsService);
        jobsController = moduleRef.get<JobsController>(JobsController);
    });

    // TODO : Consider implemenet these scenarios (need to confirm requirements with Product Owner)
    // - Forbid setting expiredAt values in the past
    // - Forbid passing empty title/description
    describe('addJob', () => {
        it('should return the job id in json format', async () => {
            const mockId = "123456"
            jest.spyOn(jobsService, "insertJob").mockResolvedValue(mockId);

            const actualResult = await jobsController.addJob('Test title', 'Test description', '2021-01-31 23:59:59');
            const expectedResult = {"id": mockId};
            expect(actualResult).toEqual(expectedResult);
        });

        it('should return the job id in json format event if arguments are emtpy', async () => {
            const mockId = "123456"
            jest.spyOn(jobsService, "insertJob").mockResolvedValue(mockId);

            const actualResult = await jobsController.addJob('', '', '');
            const expectedResult = {"id": mockId};
            expect(actualResult).toEqual(expectedResult);
        });

        // TODO : No requirements given for when an insertion fails. Returning empty id
        // for now until the requirement is clarified by the Product Owner.
        it('should return empty id value when no id is returned', async () => {
            const mockId = ""
            jest.spyOn(jobsService, "insertJob").mockResolvedValue(mockId);

            const actualResult = await jobsController.addJob('Test title', 'Test description', '2021-01-31 23:59:59');
            const expectedResult = {"id": mockId};
            expect(actualResult).toEqual(expectedResult);
        });

        // TODO : No requirements given for when an insertion throwns an error. Returning empty id
        // for now until the requirement is clarified by the Product Owner.
        it('should return empty id value when no id is returned', async () => {
            const mockId = ""
            jest.spyOn(jobsService, "insertJob").mockImplementation(() => { throw new Error("Fake error"); });

            const actualResult = await jobsController.addJob('Test title', 'Test description', '2021-01-31 23:59:59');
            const expectedResult = {"id": mockId};
            expect(actualResult).toEqual(expectedResult);
        });

    });
});
