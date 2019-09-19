import { ApiModelProperty } from '@nestjs/swagger';

export class CreateOrderDto {

  @ApiModelProperty()
  name: string;

  @ApiModelProperty()
  userId: number;

  @ApiModelProperty()
  description: string;

}