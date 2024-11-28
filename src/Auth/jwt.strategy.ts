import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface'; 
import { User } from 'src/Schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>, 
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
      secretOrKey: 'Secret', 
    });
  }


  async validate(payload: JwtPayload) {
    const user = await this.userModel.findById(payload.userId);
    if (!user) {
      throw new Error('Unauthorized'); 
    }
    return user; 
  }
}
