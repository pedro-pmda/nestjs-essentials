import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUserDTO {
  @IsString()
  @IsNotEmpty({ groups: ['create'] })
  name: string;

  @IsString()
  @IsOptional()
  bio?: string;
}
