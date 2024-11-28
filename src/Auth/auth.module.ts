import { JwtAuthService } from './jwt-auth.service';   
import { forwardRef, Module } from '@nestjs/common';
import { UsersModule } from 'src/Users/Users.module';
import { UsersService } from 'src/Users/Users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/Schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [forwardRef(() => UsersModule), MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
        secret: 'Secret',
        signOptions: { expiresIn: '1d' },
    }),
    PassportModule
    ],
    providers: [JwtAuthService, UsersService,JwtAuthGuard,JwtStrategy],
    exports: [JwtAuthService,JwtAuthGuard]
})
export class AuthModule {}