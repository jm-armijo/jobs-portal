import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobsModule } from './jobs/jobs.module';

@Module({
    imports: [
        JobsModule,
        MongooseModule.forRoot(
            'mongodb://api:password@localhost:27017/core'
        ),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
