import {
  IsString,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

class AddressDTO {
  @IsString()
  @IsNotEmpty()
  street: string;

  @IsNumber()
  houseNumber: number;
}

export class UserDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @ValidateNested()
  @Type(() => AddressDTO)
  address: AddressDTO;

  @IsString()
  @Transform(({ value }) => value?.toUpperCase())
  favoriteColor: string;
}
