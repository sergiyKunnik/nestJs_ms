import { Controller, Post, Body, Res } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/user-create.dto';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';

@ApiUseTags('user')
@Controller('user')
export class UserController {
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

  @Post()
  async create(@Res() res, @Body() createUserDto: CreateUserDto) {
    this.client.send('user-create', createUserDto).subscribe(data => {
      res.status(201).json(data)
    });
  }

  @Post('signIn')
  async signIn(@Res() res, @Body() signInDto: SignInDto) {
    await this.client.send('user-get-by-query', signInDto).subscribe(data => {
      const token = this.jwtService.sign({userId: data.id});
      res.status(201).json({token});
    }, error => {
      res.status(400).json({});
    });
  }

}
