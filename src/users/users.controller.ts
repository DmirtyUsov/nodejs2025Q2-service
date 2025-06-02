import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user';
import { CreateUserDto } from './create-user-dto.model';
import { UpdatePasswordDto } from './update-password-dto.model';

@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Get()
  findAll(): User[] {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): User {
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.userService.updatePassword(id, updatePasswordDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
