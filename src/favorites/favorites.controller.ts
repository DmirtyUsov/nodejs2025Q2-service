import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesDto } from './favorites.dto';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  findAll(): FavoritesDto {
    return this.favoritesService.findAll();
  }

  @Post('/artist/:id')
  addArtist(@Param('id', ParseUUIDPipe) id: string): void {
    this.favoritesService.addArtist(id);
  }

  @Delete('/artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeArtist(@Param('id', ParseUUIDPipe) id: string): void {
    this.favoritesService.removeArtist(id);
  }
  @Post('/album/:id')
  addAlbum(@Param('id', ParseUUIDPipe) id: string): void {
    this.favoritesService.addAlbum(id);
  }

  @Delete('/album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAlbum(@Param('id', ParseUUIDPipe) id: string): void {
    this.favoritesService.removeAlbum(id);
  }

  @Post('/track/:id')
  addTrack(@Param('id', ParseUUIDPipe) id: string): void {
    this.favoritesService.addTrack(id);
  }

  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrack(@Param('id', ParseUUIDPipe) id: string): void {
    this.favoritesService.removeTrack(id);
  }
}
