import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/Schemas/user.schema';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class JwtAuthService {
    constructor(private jwtService: JwtService) {}

    async generateToken(user:User){
      const payload: JwtPayload = { userId: user._id.toString(), email: user.email };
      return this.jwtService.sign(payload);
    }
}
