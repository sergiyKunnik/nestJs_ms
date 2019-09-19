import { Controller } from '@nestjs/common';
import { OrderService } from './order.service';
import { MessagePattern } from '@nestjs/microservices';
import { Order } from './order.entity';

@Controller()
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
  ) {}

  @MessagePattern('order-create')
  public async getCategories({name, description, userId}): Promise<Order> {
    return await this.orderService.create({name, description, userId});
  }

  @MessagePattern('order-get-all')
  public async orderGerAll(): Promise<Order[]> {
    return await this.orderService.getAll();
  }

  @MessagePattern('order-get-by-userId')
  public async orderGerByUserId({userId}): Promise<Order[]> {
    return await this.orderService.getByUserId(userId);
  }
}
