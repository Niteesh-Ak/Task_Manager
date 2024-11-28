import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as moment from "moment-timezone";

@Schema()
export class User extends Document {
    @Prop({ required: true })
    name: string;
  
    @Prop({ required: true, unique: true })
    email: string;
  
    @Prop({ required: true })
    password: string;

    @Prop({default: () => moment().tz('Asia/Kolkata').format('DD-MMM-YYYY hh:mm:ss A') })
    createdAt: string;

    //default: Date.now
    //default: () => moment().tz('Asia/Kolkata').format('DD-MMM-YYYY hh:mm:ss A')
  }
  
  export const UserSchema = SchemaFactory.createForClass(User);