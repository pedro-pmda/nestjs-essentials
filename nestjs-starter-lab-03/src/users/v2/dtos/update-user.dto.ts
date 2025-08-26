import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

// Optimized Way
export class UpdateUserDto extends PartialType(CreateUserDto) {}

// Conventional Way
// export class UpdateUserDto {
//   name?: string;
//   email?: string;
//   id: number;
// }
