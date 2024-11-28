import { Controller, Post, Body, Req, Get, Query, UseGuards } from "@nestjs/common";
import { CreateTaskDto } from "./dto/createTask.dto";
import { TasksService } from "./tasks.service";
import { JwtAuthGuard } from "src/Auth/jwt-auth.guard";


@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    async createTask(@Body() createTaskDto: CreateTaskDto, @Req() req: any) {
      const userId = req.user._id.toString();

        const taskData = {
          ...createTaskDto,
          createdBy: userId,
          assignedTo: createTaskDto.assignedTo || userId,
        };
        return this.tasksService.createTask(taskData);
    }

    @Get('assigned')
    @UseGuards(JwtAuthGuard)
    async getTasks(@Req() req: any) {
      const userId = req.user._id.toString();
      return this.tasksService.getTasksByUser(userId);
      }

    @Get('created')
    @UseGuards(JwtAuthGuard)
    async countTasks(@Req() req:any) {
      const userId = req.user._id.toString();
      return this.tasksService.getCreatedTasks(userId);
    }

    @Get('status')
    @UseGuards(JwtAuthGuard)
    async getTaskStats(@Req() req: any) {
        const userId = req.user._id.toString(); 
        return this.tasksService.getTaskStats(userId);
    }
  }