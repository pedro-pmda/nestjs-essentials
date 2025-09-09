import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => Int, { description: 'The unique id of a user' })
  id: number;

  @Field(() => String, { description: 'Tje name of a user' })
  name: string;

  @Field(() => String, { description: 'The email of a user' })
  email: string;
}

@ObjectType()
export class UserSubscription {
  @Field(() => User)
  userAdded: User;
  @Field(() => User)
  userUpdated: User;
}
