import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => Int, { description: 'The unique id of a user' })
  id: number;

  @Field(() => String, { description: 'Tje name of a user' })
  name: string;

  @Field(() => String, { description: 'The email of a user' })
  email: string;
}
