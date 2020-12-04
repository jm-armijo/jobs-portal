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
	addJob(
		@Body('title') title: string,
		@Body('description') description: string,
		@Body('expiredAt') expiredAt: string,
	) {
		const id = this.jobsService.insertJob(title, description, expiredAt);
		return {id: id};
	}
}
