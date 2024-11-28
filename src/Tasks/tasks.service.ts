import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/createTask.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from 'src/Schemas/Tasks.schema';
import { Model } from 'mongoose';
import { User } from 'src/Schemas/user.schema';

@Injectable()
export class TasksService {
    constructor(
        @InjectModel(Task.name) private TaskModel: Model<Task>,
        @InjectModel(User.name) private UserModel: Model<User>){}

        async createTask(createTaskDto: CreateTaskDto & { createdBy: string }): Promise<Task> {
            if (createTaskDto.assignedTo) {
              const userExists = await this.UserModel.exists({ _id: createTaskDto.assignedTo });
              if (!userExists) {
                throw new BadRequestException('Assigned user does not exist');
              }
            }
        
            const task = new this.TaskModel(createTaskDto);
            return task.save();
          }

        async getTasksByUser(userId: string){
          const asignedTasks = await this.TaskModel.find({ assignedTo: userId })
          .populate('createdBy', 'email')
          .lean();

        const totalAssigned = asignedTasks.length;

          return {asignedTasks, totalAssigned};
        }

        async getCreatedTasks(userId: string){
          const createdTasks = await this.TaskModel.find({ createdBy: userId })
            .populate('assignedTo', 'email') 
            .lean();
        const totalCreated = createdTasks.length;

        return {
            createdTasks,
            totalCreated,
        };
    }

    async getTaskStats(userId: string) {
      const createdTasks = await this.TaskModel.find({ createdBy: userId }).lean();
      const assignedTasks = await this.TaskModel.find({ assignedTo: userId }).lean();
      const createdTaskStatus = this.groupTasksByStatus(createdTasks);
      const assignedTaskStatus = this.groupTasksByStatus(assignedTasks);

      return {
          totalCreated: createdTasks.length,
          totalAssigned: assignedTasks.length,
          createdTaskStatus,
          assignedTaskStatus,
      };
  }

  private groupTasksByStatus(tasks: any[]) {
    const result = {};
    for (const task of tasks) {
        result[task.status] = (result[task.status] || 0) + 1;
    }
    return result;
  }
}
