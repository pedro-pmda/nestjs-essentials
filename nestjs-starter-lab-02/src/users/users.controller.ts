import { Controller, Get, Param } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  findAll() {
    return 'This action returns all users';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a user with ID ${id}`;
  }

  @Get(':id/:sex/:minAge')
  filterUsers(
    @Param('id') id: string,
    @Param('sex') sex: string,
    @Param('minAge') minAge: string,
    @Param('salary') salary: string,
  ) {
    return `Fetching users with ID: ${id},
            Sex: ${sex},
            Minimun Age: ${minAge}
            and Salary: ${salary || 'Not Specified'}`;
  }

  @Get('details')
  findDetails() {
    return 'Details about users';
  }

  @Get('images')
  findImages() {
    return 'Images of various users';
  }
}
