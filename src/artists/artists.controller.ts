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
import { Artist } from './artist';
import { ArtistsService } from './artists.service';
import { UpdateArtistDto } from './update-artist.dto';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistService: ArtistsService) {}

  @Get()
  findAll(): Artist[] {
    return this.artistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Artist {
    return this.artistService.findOne(id);
  }

  @Post()
  create(@Body(ValidationPipe) updateArtistDto: UpdateArtistDto): Artist {
    return this.artistService.create(updateArtistDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updateArtistDto: UpdateArtistDto,
  ): Artist {
    return this.artistService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseUUIDPipe) id: string): Artist {
    return this.artistService.delete(id);
  }
}
