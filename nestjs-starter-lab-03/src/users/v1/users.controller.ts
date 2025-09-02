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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { MockAuthGuard } from './auth/mock-auth.guard';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Retrieve all the users' })
  @ApiOkResponse({
    description: 'The users has been succesfully retrieved',
    type: 'UsernEntity[]',
  })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  @ApiOperation({ summary: 'Retrieve a user by ID' })
  @ApiOkResponse({
    description: 'The user has been succesfully retrieved',
    type: 'UsernEntity',
  })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @ApiOperation({ summary: 'Create a new user' })
  @ApiOkResponse({
    description: 'The user has been succesfully created',
    type: 'UsernEntity',
  })
  @Post()
  @UseGuards(MockAuthGuard)
  createUser(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiOkResponse({
    description: 'The user has been succesfully updated',
    type: 'UsernEntity',
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
