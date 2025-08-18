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

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  @Transform((value) => value.toUpperCase())
  favoriteColor: string;
}
