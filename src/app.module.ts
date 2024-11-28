import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './Users/Users.module';
import { TasksModule } from './Tasks/Tasks.module';


@Module({
  imports: [UsersModule,TasksModule,  MongooseModule.forRoot("mongodb+srv://niteesharisetty:Nittu@project0.j1ses.mongodb.net/Taskk")],
})
export class AppModule {}

