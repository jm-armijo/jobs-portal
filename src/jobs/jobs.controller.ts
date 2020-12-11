import { Controller, Post, Request, Body, UseGuards} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JwtAdminGuard } from '../auth/guards/jwt.admin.guard';

@Controller('jobs')
export class JobsController {
    constructor(private readonly jobsService: JobsService) {}

    @UseGuards(JwtAdminGuard)
    @Post('create')
    async addJob(
        @Request() request: any,
        @Body('title') title: string,
        @Body('description') description: string,
        @Body('expiredAt') expiredAt: string,
    ) {
        const user = request.user
        const companyId = user.companyId;

        let response: any = {};
        try {
            const id = await this.jobsService.insertJob(title, description, expiredAt, companyId);
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
