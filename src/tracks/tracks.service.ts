import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InMemoryDbService } from 'src/in-memory-db/in-memory-db.service';
import { Track } from './track';
import { randomUUID } from 'node:crypto';
import { UpdateTrackDto } from './update-track.dto';

@Injectable()
export class TracksService {
  constructor(private readonly inMemoryDBService: InMemoryDbService) {}

  findAll(): Track[] {
    return this.inMemoryDBService.track.list();
  }

  findOne(id: string): Track {
    const artist = this.inMemoryDBService.track.get(id);
    if (!artist) {
      throw new NotFoundException();
    }
    return artist;
  }

  create(updateTrackDto: UpdateTrackDto): Track {
    const { name, albumId, artistId, duration } = updateTrackDto;
    const id = randomUUID();

    const newTrack: Track = {
      id,
      name,
      artistId,
      albumId,
      duration,
    };
    const result = this.inMemoryDBService.track.update(id, newTrack);
    if (!result) {
      throw new ForbiddenException();
    }
    return newTrack;
  }

  update(id: string, updateTrackDto: UpdateTrackDto): Track {
    const { name, albumId, artistId, duration } = updateTrackDto;
    const track: Track = this.inMemoryDBService.track.get(id);

    if (!track) {
      throw new NotFoundException();
    }

    track.name = name;
    track.albumId = albumId;
    track.artistId = artistId;
    track.duration = duration;

    const result = this.inMemoryDBService.track.update(id, track);
    return result;
  }

  delete(id: string): Track {
    const track = this.inMemoryDBService.track.delete(id);
    if (!track) {
      throw new NotFoundException();
    }
    this.inMemoryDBService.cleanTrack(id);
    return track;
  }
}
