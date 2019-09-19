import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiModelProperty()
  group: number;

  @ApiModelProperty()
  email: string;

  @ApiModelProperty()
  password: string;
}