import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService, UserViewDto } from '../application/users.service';
import { CreateUserDto, UpdateUserDto } from '../entity/users.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers(): Promise<UserViewDto[]> {
    return this.usersService.getUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<UserViewDto> {
    const result = await this.usersService.getUserById(id);

    if (!result) {
      throw new NotFoundException();
    }

    return result;
  }

  @Get('by-ids')
  async getUsersByIds(@Query('ids') ids: string[]): Promise<UserViewDto[]> {
    const result = await this.usersService.getUsersByIds(ids);

    return result;
  }

  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<string> {
    return this.usersService.createUser(dto);
  }

  @Post(':id')
  async updateUser(
    @Body() dto: UpdateUserDto,
    @Param('id') id: string,
  ): Promise<boolean> {
    return this.usersService.updateUser(dto, id);
  }

  @Post('avatar/:id')
  async replaceAvatar(
    @Body() dto: { avatarId: string },
    @Param('id') id: string,
  ): Promise<boolean> {
    return this.usersService.replaceAvatar(id, dto.avatarId);
  }
}
