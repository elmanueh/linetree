import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from './schema/user.schema';

@Injectable()
export class UsersService {
  constructor(
    private readonly httpService: HttpService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async create(user: User) {
    const createdUser = new this.userModel(user);
    await createdUser.save();
  }

  async findOne(id: string): Promise<User> {
    const objectId = Types.ObjectId.isValid(id) ? new Types.ObjectId(id) : null;
    if (!objectId) throw new BadRequestException('The user ID is not valid');

    const user = await this.userModel.findById(objectId);
    if (!user)
      throw new NotFoundException('The user with the given ID was not found');
    return user;
  }

  async remove(id: string) {
    const objectId = Types.ObjectId.isValid(id) ? new Types.ObjectId(id) : null;
    if (!objectId) throw new BadRequestException('The user ID is not valid');

    await this.userModel.findByIdAndDelete(id);
  }

  async createTree(id: string) {
    //const url = 'http://localhost:3002/trees';
    // await this.httpService.post(url);
    return 'created tree';
  }
}
