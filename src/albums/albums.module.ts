import { Module } from '@nestjs/common';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';
import { InMemoryDbModule } from 'src/in-memory-db/in-memory-db.module';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService],
  imports: [InMemoryDbModule],
})
export class AlbumsModule {}
