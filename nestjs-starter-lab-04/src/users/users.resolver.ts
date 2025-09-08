import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User, { description: 'Crea un nuevo usuario en el sistema' })
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [User], {
    name: 'users',
    description: 'Devuelve la lista completa de usuarios',
  })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, {
    name: 'user',
    description: 'Busca un usuario por su ID',
  })
  findOne(
    @Args('id', {
      type: () => Int,
      description: 'Identificador único del usuario',
    })
    id: number,
  ) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User, {
    description: 'Actualiza los datos de un usuario existente',
  })
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User, { description: 'Elimina un usuario por ID' })
  removeUser(
    @Args('id', {
      type: () => Int,
      description: 'Identificador del usuario a eliminar',
    })
    id: number,
  ) {
    return this.usersService.remove(id);
  }
}
