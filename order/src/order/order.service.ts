import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {
  }

  async create({name, description, userId}): Promise<Order> {
    return await this.orderRepository.save({name, description, userId});
  }

  async getAll(): Promise<Order[]> {
    return await this.orderRepository.find();
  }

  async getByUserId(userId: number): Promise<Order[]> {
    return await this.orderRepository.find({userId});
  }

}
