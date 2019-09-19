import { Controller, Post, Res, Body, UseGuards, Get, Req } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/order-create.dto';
import { AuthGuard } from 'src/quards/auth.quard';
import { AdminGuard } from 'src/quards/admin.quard';

@ApiUseTags('order')
@Controller('order')
export class OrderController {
  private orderClient: ClientProxy;
  constructor(
  ) {
    this.orderClient = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 3010,
      },
    });
  }
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  async create(@Req() request, @Res() res, @Body() createOrderDto: CreateOrderDto) {

    this.orderClient.send('order-create', {...createOrderDto, userId: request.user.id}).subscribe(data => {
      res.status(201).json(data)
    });
  }

  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @Get()
  async getAll(@Res() res) {
    this.orderClient.send('order-get-all', {}).subscribe(data => {
      res.status(201).json(data)
    });
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get()
  async getMyAll(@Req() request, @Res() res) {
    this.orderClient.send('order-get-by-userId', {userId: request.user.id}).subscribe(data => {
      res.status(201).json(data)
    });
  }
}
