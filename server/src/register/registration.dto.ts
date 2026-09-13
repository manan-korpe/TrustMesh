import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
export class RegisterDto {
  @IsNotEmpty() @IsString() name!: string;
  @IsEmail() email!: string;
  @IsNotEmpty() @IsString() employeeId!: string;
  @IsNotEmpty() @IsString() department!: string;
  @Matches(/^0x[a-fA-F0-9]{40}$/, {
    message: 'wallet must be a valid Ethereum address',
  })
  wallet!: string;
  signature!: string;
  message!: string;
  did!: string;
}
