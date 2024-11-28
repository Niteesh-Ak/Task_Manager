import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Task, TaskSchema } from "src/Schemas/Tasks.schema";
import { User, UserSchema } from "src/Schemas/User.schema";
import { TasksController } from "./Tasks.controller";
import { TasksService } from './tasks.service';

@Module({
    imports: [MongooseModule.forFeature([
        { name: Task.name, schema: TaskSchema },
        { name: User.name, schema: UserSchema }])],
    providers: [TasksService],
    controllers: [TasksController]
})
export class TasksModule {}