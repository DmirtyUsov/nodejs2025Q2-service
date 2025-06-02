import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InMemoryDbService } from 'src/in-memory-db/in-memory-db.service';
import { Album } from './album';
import { randomUUID } from 'node:crypto';
import { UpdateAlbumDto } from './update-album.dto';

@Injectable()
export class AlbumsService {
  constructor(private readonly inMemoryDBService: InMemoryDbService) {}

  findAll(): Album[] {
    return this.inMemoryDBService.album.list();
  }

  findOne(id: string): Album {
    const artist = this.inMemoryDBService.album.get(id);
    if (!artist) {
      throw new NotFoundException();
    }
    return artist;
  }

  create(updateAlbumDto: UpdateAlbumDto): Album {
    const { name, year, artistId } = updateAlbumDto;
    const id = randomUUID();

    const newAlbum: Album = {
      id,
      name,
      year,
      artistId,
    };
    const result = this.inMemoryDBService.album.update(id, newAlbum);
    if (!result) {
      throw new ForbiddenException();
    }
    return newAlbum;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto): Album {
    const { name, year, artistId } = updateAlbumDto;
    const album: Album = this.inMemoryDBService.album.get(id);

    if (!album) {
      throw new NotFoundException();
    }

    album.name = name;
    album.year = year;
    album.artistId = artistId;

    const result = this.inMemoryDBService.album.update(id, album);
    return result;
  }

  delete(id: string): Album {
    const artist = this.inMemoryDBService.album.delete(id);
    if (!artist) {
      throw new NotFoundException();
    }
    //this.inMemoryDBService.cleanAlbum(id);
    return artist;
  }
}
