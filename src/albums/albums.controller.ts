import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { Album } from './album';
import { UpdateAlbumDto } from './update-album.dto';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumService: AlbumsService) {}

  @Get()
  findAll(): Album[] {
    return this.albumService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Album {
    return this.albumService.findOne(id);
  }

  @Post()
  create(@Body(ValidationPipe) updateAlbumDto: UpdateAlbumDto): Album {
    return this.albumService.create(updateAlbumDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updateAlbumDto: UpdateAlbumDto,
  ): Album {
    return this.albumService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseUUIDPipe) id: string): Album {
    return this.albumService.delete(id);
  }
}
