import { IsString, IsNotEmpty, IsOptional, IsMongoId, IsEnum } from "class-validator";

export class    CreateTaskDto {
    @IsString()
    @IsNotEmpty({ message: 'Title is required' })
    title: string;

    @IsString()
    @IsOptional()
    description?: string;    

    @IsOptional()
    @IsEnum(['todo', 'in-progress', 'done'], {message: 'Invalid status'})
    status?: string;

    @IsOptional()
    @IsMongoId({message: 'Invalid user id'})
    assignedTo?: string;

    // createdBy: string;

    }