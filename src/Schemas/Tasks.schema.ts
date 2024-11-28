import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Types } from 'mongoose';

@Schema()
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ enum: ['todo', 'in-progress', 'done'], default: 'todo' })
  status: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdBy: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  assignedTo: Types.ObjectId;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
