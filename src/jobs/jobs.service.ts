import { Injectable } from '@nestjs/common'
import { Job } from './job.model'

@Injectable()
export class JobsService {
	jobs: Job[] = [];

	insertJob(
		title: string,
		description: string,
		expiredAt: string
	) {
		const job = new Job('id', title, description, expiredAt);
		this.jobs.push(job);
		return 'id';
	}
}
