import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name)
        private readonly UserModel: Model<UserDocument>
    ){}

    async getUser(username: string) {
        const data = await this.UserModel.findOne({ username }).exec()
        return data
    }

    async create(user:User): Promise<User> {
        const newUser = await new this.UserModel(user)
        return newUser.save()
    }

}
