import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { JwtModule } from '@nestjs/jwt';
import { OrderController } from './order/order.controller';
import { AuthGuard } from './quards/auth.quard';
import { AdminGuard } from './quards/admin.quard';
import { GraphQLModule } from '@nestjs/graphql';
import { OrderResolver } from './order/order.resolver';

@Module({
  imports: [
    JwtModule.register({
      secret: 'jwtConstants.secret',
      signOptions: { expiresIn: '60000000000s' },
    })
  ],
  controllers: [UserController, OrderController],
  providers: [AuthGuard, AdminGuard, OrderResolver],
})
export class AppModule {}
