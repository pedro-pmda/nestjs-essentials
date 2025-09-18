import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
  Version,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { MockAuthGuard } from './auth/mock-auth.guard';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from './entities/users.entity';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Retrieve all the users' })
  @ApiOkResponse({
    description: 'The users has been succesfully retrieved',
    type: User,
    isArray: true,
  })
  @Get()
  @Version('1')
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
  @ApiOperation({ summary: 'Retrieve a user by ID' })
  @ApiOkResponse({
    description: 'The user has been succesfully retrieved',
    type: User,
  })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @ApiOperation({ summary: 'Create a new user' })
  @ApiOkResponse({
    description: 'The user has been succesfully created',
  })
  @Post()
  @UseGuards(MockAuthGuard)
  createUser(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiOkResponse({
    description: 'The user has been succesfully updated',
  })
  @Patch(':id')
  @UseGuards(MockAuthGuard)
  updateUser(
    @Body(new ValidationPipe()) updateUserDto: UpdateUserDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.usersService.updateUser({
      ...updateUserDto,
      id,
    });
  }
}
