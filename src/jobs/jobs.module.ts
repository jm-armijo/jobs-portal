import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';
import { JobSchema } from './job.model'

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'Job', schema: JobSchema}])
    ],
    controllers: [JobsController],
    providers: [JobsService],
})
export class JobsModule {}
