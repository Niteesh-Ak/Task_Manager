import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/Schemas/user.schema";
import { UsersService } from "./Users.service";
import { UsersController } from "./Users.controller";
import { AuthModule } from "src/Auth/Auth.module";

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    AuthModule],
    providers: [UsersService],
    controllers: [UsersController],
    exports: [UsersService]
})

export class UsersModule {}