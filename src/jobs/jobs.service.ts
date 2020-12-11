import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { Model } from 'mongoose';
import { Job } from './job.model'

@Injectable()
export class JobsService {
    constructor(@InjectModel('Job') private readonly jobModel: Model<Job>) {}

    async insertJob(
        title: string,
        description: string,
        expiredAt: Date,
        companyId: string,
    ) {
        const job = new this.jobModel({
            title: title,
            description: description,
            expiredAt: expiredAt,
            companyId: companyId,
        });

        let result: any = {};
        try {
            result = await job.save();
        } catch(e) {
            // TODO : We should log the full error (including backtrace) to a log file.
            // Logging to console for now as that requirement is out of scope at the moment.
            console.log(e.message);
            result.id = "";
        }
        return result.id as string;
    }
}
