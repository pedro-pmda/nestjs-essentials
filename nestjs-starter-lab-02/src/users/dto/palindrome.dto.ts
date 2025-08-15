import { IsNotEmpty } from 'class-validator';
import { IsPalindrome } from '../decorators/is-palindrome.decorator';

export class PalindromeDTO {
  @IsNotEmpty()
  @IsPalindrome({
    message: 'The provided word or phrase is not a palindrome.',
  })
  word: string;
}
