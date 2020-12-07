import {
    Controller,
    Post,
    Body,
} from '@nestjs/common';
import { JobsService } from './jobs.service';

@Controller('jobs')
export class JobsController {
    constructor(private readonly jobsService: JobsService) {}

    @Post()
    async addJob(
        @Body('title') title: string,
        @Body('description') description: string,
        @Body('expiredAt') expiredAt: string,
    ) {
        let response: any = {};
        try {
            const id = await this.jobsService.insertJob(title, description, expiredAt);
            response = {id: id};
        } catch(e) {
            // TODO : We should log the full error (including backtrace) to a log file.
            // Logging to console for now as that requirement is out of scope at the moment.
            console.log(e.message);
            response = {id: ""}
        }

        return response;
    }
}
