import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InMemoryDbService } from 'src/in-memory-db/in-memory-db.service';
import { Artist } from './artist';
import { randomUUID } from 'node:crypto';
import { UpdateArtistDto } from './update-artist.dto';

@Injectable()
export class ArtistsService {
  constructor(private readonly inMemoryDBService: InMemoryDbService) {}

  findAll(): Artist[] {
    return this.inMemoryDBService.artist.list();
  }

  findOne(id: string): Artist {
    const artist = this.inMemoryDBService.artist.get(id);
    if (!artist) {
      throw new NotFoundException();
    }
    return artist;
  }

  create(updateArtistDto: UpdateArtistDto): Artist {
    const { name, grammy } = updateArtistDto;
    const id = randomUUID();

    const newArtist: Artist = {
      id,
      name,
      grammy,
    };
    const result = this.inMemoryDBService.artist.update(id, newArtist);
    if (!result) {
      throw new ForbiddenException();
    }
    return newArtist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto): Artist {
    const { name, grammy } = updateArtistDto;
    const artist: Artist = this.inMemoryDBService.artist.get(id);

    if (!artist) {
      throw new NotFoundException();
    }

    artist.name = name;
    artist.grammy = grammy;

    const result = this.inMemoryDBService.artist.update(id, artist);
    return result;
  }

  delete(id: string): Artist {
    const artist = this.inMemoryDBService.artist.delete(id);
    if (!artist) {
      throw new NotFoundException();
    }
    this.inMemoryDBService.cleanArtist(id);
    return artist;
  }
}
