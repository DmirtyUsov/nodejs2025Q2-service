import { Module } from '@nestjs/common';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';
import { InMemoryDbModule } from 'src/in-memory-db/in-memory-db.module';

@Module({
  controllers: [TracksController],
  providers: [TracksService],
  imports: [InMemoryDbModule],
})
export class TracksModule {}
