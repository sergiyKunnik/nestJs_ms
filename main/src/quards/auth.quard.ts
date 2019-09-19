import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { Transport } from '@nestjs/common/enums/transport.enum';

@Injectable()
export class AuthGuard implements CanActivate {
  private client: ClientProxy;
  constructor(
    private readonly jwtService: JwtService,
  ) {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 3012,
      },
    });
  }

  async canActivate( context: ExecutionContext ): Promise<any> {
      const request: any = context.switchToHttp().getRequest();
      const bearerToken: any = request.headers.authorization.split(' ')[1];

      if (bearerToken) {
        const status = this.jwtService.verify(bearerToken);
        if (status) {
          try {
            const user = await this.client.send('user-get-by-query', {id: status.userId}).toPromise()
            request.user = user;
            return true
          } catch(error){
            return false
          }
        }
      }

  }
}
