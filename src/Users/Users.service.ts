import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/Schemas/user.schema";
import { CreateUserDtoo } from "./dto/createUser.dto";
import * as bcrypt from 'bcrypt';
import { JwtAuthService } from "src/Auth/jwt-auth.service";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>,
    private jwtAuthService: JwtAuthService,
) {}
    
    async createUser(CreateUserDtoo: CreateUserDtoo) {
        const existingUser = await this.userModel.findOne({ email: CreateUserDtoo.email });
        if (existingUser) throw new BadRequestException('Email already exists');
        const hashedPassword = await bcrypt.hash(CreateUserDtoo.password,10)

        const user = new this.userModel({
            ...CreateUserDtoo, password: hashedPassword});

        await user.save();
        return "User created successfully";
    }

    getUsers(){
        return this.userModel.find();
    }

    getUserById(id: string){
        return this.userModel.findById(id);
    }   

    async login(body:{email:string, password:string}){ 
        const user = await this.userModel.findOne({ email: body.email });
        if (!user) return "User email is incorrect";
    
        const isValid = await bcrypt.compare(body.password, user.password);
        if (!isValid) return "User password is incorrect";

        const token = await this.jwtAuthService.generateToken(user);
        return { message: 'User logged in', token };
    }
    
}


