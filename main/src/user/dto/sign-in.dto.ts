import { ApiModelProperty } from '@nestjs/swagger';

export class SignInDto {

  @ApiModelProperty()
  email: string;

  @ApiModelProperty()
  password: string;
}