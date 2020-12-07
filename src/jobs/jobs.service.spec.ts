import * as mongoose from 'mongoose';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { JobsService } from './jobs.service';
import { Job, JobSchema } from './job.model';

export class ModelMock {
    public async save(): Promise<void> {}
}

describe('JobsService', () => {
    let jobsService: JobsService;
    let jobModel;

    beforeEach(async () => {

        jobModel = mongoose.model('Jobs', JobSchema);

        const moduleRef: TestingModule = await Test.createTestingModule({
            providers: [
                JobsService,
                {
                    provide: getModelToken('Job'),
                    useValue: jobModel,
                },
            ],
        }).compile();

        jobsService = moduleRef.get<JobsService>(JobsService);
    });


    // TODO : Consider implemenet these scenarios (need to confirm requirements with Product Owner)
    // - Forbid setting expiredAt values in the past
    // - Forbid passing empty title/description
    describe('insertJob', () => {

        it('should return the job id as string on success', async () => {
            let jobId = "123456";
            let mockedResponse: any = {};
            mockedResponse.id = jobId;

            jest.spyOn(jobModel.prototype, 'save').mockResolvedValue(mockedResponse);

            const actualResult = await jobsService.insertJob('Test title', 'Test description', '2021-01-31 23:59:59');
            const expectedResult = jobId;
            expect(actualResult).toEqual(expectedResult);
        });

        it('should return the job id as string on success event if arguments are emtpy', async () => {
            let jobId = "123456";
            let mockedResponse: any = {};
            mockedResponse.id = jobId;

            jest.spyOn(jobModel.prototype, 'save').mockResolvedValue(mockedResponse);

            const actualResult = await jobsService.insertJob('', '', '');
            const expectedResult = jobId;
            expect(actualResult).toEqual(expectedResult);
        });

        it('should return empty string when no id is returned', async () => {
            let jobId = "";
            let mockedResponse: any = {};
            mockedResponse.id = jobId;

            jest.spyOn(jobModel.prototype, 'save').mockResolvedValue(mockedResponse);

            const actualResult = await jobsService.insertJob('Test title', 'Test description', '2021-01-31 23:59:59');
            const expectedResult = jobId;
            expect(actualResult).toEqual(expectedResult);
        });

        it('should return empty string on error', async () => {
            let jobId = "";
            let mockedResponse: any = {};
            mockedResponse.id = jobId;

            jest.spyOn(jobModel.prototype, 'save').mockImplementation(() => { throw new Error("Fake error"); });

            const actualResult = await jobsService.insertJob('Test title', 'Test description', '2021-01-31 23:59:59');
            const expectedResult = jobId;
            expect(actualResult).toEqual(expectedResult);
        });
    });
});
