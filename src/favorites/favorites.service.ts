import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InMemoryDbService } from 'src/in-memory-db/in-memory-db.service';
import { FavoritesDto } from './favorites.dto';
import { FavTables } from 'src/in-memory-db/favorites.db';

@Injectable()
export class FavoritesService {
  constructor(private readonly inMemoryBDService: InMemoryDbService) {}

  findAll(): FavoritesDto {
    return this.inMemoryBDService.getFavorites();
  }

  addArtist(id: string): boolean {
    const table = FavTables.artist;
    const result = this.inMemoryBDService.addFavorites(table, id);
    if (!result) {
      throw new UnprocessableEntityException(makeErrorMessage(table, id));
    }
    return result;
  }

  addTrack(id: string): boolean {
    const table = FavTables.track;
    const result = this.inMemoryBDService.addFavorites(table, id);
    if (!result) {
      throw new UnprocessableEntityException(makeErrorMessage(table, id));
    }
    return result;
  }

  addAlbum(id: string): boolean {
    const table = FavTables.album;
    const result = this.inMemoryBDService.addFavorites(table, id);
    if (!result) {
      throw new UnprocessableEntityException(makeErrorMessage(table, id));
    }
    return result;
  }

  removeArtist(id: string): boolean {
    const table = FavTables.artist;
    const result = this.inMemoryBDService.removeFavorites(table, id);
    if (!result) {
      throw new NotFoundException(makeErrorMessage(table, id, true));
    }
    return result;
  }

  removeAlbum(id: string): boolean {
    const table = FavTables.album;
    const result = this.inMemoryBDService.removeFavorites(table, id);
    if (!result) {
      throw new NotFoundException(makeErrorMessage(table, id, true));
    }
    return result;
  }

  removeTrack(id: string): boolean {
    const table = FavTables.track;
    const result = this.inMemoryBDService.removeFavorites(table, id);
    if (!result) {
      throw new NotFoundException(makeErrorMessage(table, id, true));
    }
    return result;
  }
}

const makeErrorMessage = (
  table: FavTables,
  id: string,
  isRemove = false,
): string => {
  return `${table} with id: ${id} does not ${isRemove ? 'favorite' : 'exist'}.`;
};
