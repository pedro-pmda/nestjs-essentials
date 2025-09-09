import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Subscription,
} from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User, { description: 'Crea un nuevo usuario en el sistema' })
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    const newUser = this.usersService.create(createUserInput);
    pubSub.publish('userCreated', { userCreated: newUser });
    return newUser;
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
    const updateUser = this.usersService.update(
      updateUserInput.id,
      updateUserInput,
    );
    pubSub.publish('userUpdated', { userUpdated: updateUser });

    return updateUser;
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

  @Subscription(() => User, {
    name: 'userCreated',
  })
  userCreated() {
    return pubSub.asyncIterableIterator('userCreated');
  }
  @Subscription(() => User, {
    name: 'userUpdated',
  })
  userUpdated() {
    return pubSub.asyncIterableIterator('userUpdated');
  }
}
